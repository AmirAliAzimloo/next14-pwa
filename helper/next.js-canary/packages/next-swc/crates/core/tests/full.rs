use std::path::{Path, PathBuf};

use next_swc::{custom_before_pass, TransformOptions};
use serde::de::DeserializeOwned;
use turbopack_binding::swc::{
    core::{
        base::Compiler,
        common::{comments::SingleThreadedComments, Mark},
        ecma::{
            parser::{Syntax, TsConfig},
            transforms::base::pass::noop,
        },
    },
    testing::{NormalizedOutput, Tester},
};

#[turbopack_binding::swc::testing::fixture("tests/full/**/input.js")]
fn full(input: PathBuf) {
    test(&input, true);
}

#[turbopack_binding::swc::testing::fixture("tests/loader/**/input.js")]
fn loader(input: PathBuf) {
    test(&input, false);
}

fn test(input: &Path, minify: bool) {
    let output = input.parent().unwrap().join("output.js");

    Tester::new()
        .print_errors(|cm, handler| {
            let c = Compiler::new(cm.clone());

            let fm = cm.load_file(input).expect("failed to load file");

            let options = TransformOptions {
                swc: turbopack_binding::swc::core::base::config::Options {
                    swcrc: true,
                    output_path: Some(output.clone()),

                    config: turbopack_binding::swc::core::base::config::Config {
                        is_module: Some(
                            turbopack_binding::swc::core::base::config::IsModule::Bool(true),
                        ),

                        jsc: turbopack_binding::swc::core::base::config::JscConfig {
                            minify: if minify {
                                Some(assert_json("{ \"compress\": true, \"mangle\": true }"))
                            } else {
                                None
                            },
                            syntax: Some(Syntax::Typescript(TsConfig {
                                tsx: true,
                                ..Default::default()
                            })),
                            ..Default::default()
                        },
                        ..Default::default()
                    },
                    ..Default::default()
                },
                disable_next_ssg: false,
                disable_page_config: false,
                pages_dir: None,
                is_page_file: false,
                is_development: true,
                is_server_compiler: false,
                server_components: None,
                styled_components: Some(assert_json("{}")),
                styled_jsx: Some(assert_json("{}")),
                remove_console: None,
                react_remove_properties: None,
                relay: None,
                shake_exports: None,
                emotion: Some(assert_json("{}")),
                modularize_imports: None,
                font_loaders: None,
                app_dir: None,
                server_actions: None,
                cjs_require_optimizer: None,
                auto_modularize_imports: None,
                optimize_barrel_exports: None,
                optimize_server_react: None,
                prefer_esm: false,
            };

            let unresolved_mark = Mark::new();
            let mut options = options.patch(&fm);
            options.swc.unresolved_mark = Some(unresolved_mark);

            let comments = SingleThreadedComments::default();
            match c.process_js_with_custom_pass(
                fm.clone(),
                None,
                &handler,
                &options.swc,
                comments.clone(),
                |_| {
                    custom_before_pass(
                        cm.clone(),
                        fm.clone(),
                        &options,
                        comments.clone(),
                        Default::default(),
                        unresolved_mark,
                    )
                },
                |_| noop(),
            ) {
                Ok(v) => {
                    NormalizedOutput::from(v.code)
                        .compare_to_file(output)
                        .unwrap();
                }
                Err(err) => panic!("Error: {:?}", err),
            };

            Ok(())
        })
        .map(|_| ())
        .expect("failed");
}

/// Using this, we don't have to break code by adding field.s
fn assert_json<T>(json_str: &str) -> T
where
    T: DeserializeOwned,
{
    serde_json::from_str(json_str).expect("failed to deserialize")
}
