use anyhow::Result;
use next_transform_strip_page_exports::ExportFilter;
use turbo_tasks::Vc;
use turbopack_binding::turbopack::turbopack::module_options::ModuleRule;

use crate::{
    mode::NextMode,
    next_client_reference::css_client_reference::css_client_reference_rule::get_next_css_client_reference_transforms_rule,
    next_config::NextConfig,
    next_server::context::ServerContextType,
    next_shared::transforms::{
        get_next_dynamic_transform_rule, get_next_font_transform_rule, get_next_image_rule,
        get_next_modularize_imports_rule, get_next_pages_transforms_rule,
        get_server_actions_transform_rule, server_actions::ActionsTransform,
    },
};

/// Returns a list of module rules which apply server-side, Next.js-specific
/// transforms.
pub async fn get_next_server_transforms_rules(
    next_config: Vc<NextConfig>,
    context_ty: ServerContextType,
    mode: NextMode,
) -> Result<Vec<ModuleRule>> {
    let mut rules = vec![];

    let modularize_imports_config = &next_config.await?.modularize_imports;
    let mdx_rs = *next_config.mdx_rs().await?;
    if let Some(modularize_imports_config) = modularize_imports_config {
        rules.push(get_next_modularize_imports_rule(
            modularize_imports_config,
            mdx_rs,
        ));
    }
    rules.push(get_next_font_transform_rule(mdx_rs));

    let (is_server_components, pages_dir) = match context_ty {
        ServerContextType::Pages { pages_dir } | ServerContextType::PagesApi { pages_dir } => {
            (false, Some(pages_dir))
        }
        ServerContextType::PagesData { pages_dir } => {
            rules.push(
                get_next_pages_transforms_rule(pages_dir, ExportFilter::StripDefaultExport, mdx_rs)
                    .await?,
            );
            (false, Some(pages_dir))
        }
        ServerContextType::AppSSR { .. } => {
            // Yah, this is SSR, but this is still treated as a Client transform layer.
            rules.push(get_server_actions_transform_rule(
                ActionsTransform::Client,
                mdx_rs,
            ));
            (false, None)
        }
        ServerContextType::AppRSC {
            client_transition, ..
        } => {
            rules.push(get_server_actions_transform_rule(
                ActionsTransform::Server,
                mdx_rs,
            ));
            if let Some(client_transition) = client_transition {
                rules.push(get_next_css_client_reference_transforms_rule(
                    client_transition,
                ));
            }
            (true, None)
        }
        ServerContextType::AppRoute { .. } => (false, None),
        ServerContextType::Middleware { .. } | ServerContextType::Instrumentation { .. } => {
            (false, None)
        }
    };

    rules.push(
        get_next_dynamic_transform_rule(true, is_server_components, pages_dir, mode, mdx_rs)
            .await?,
    );

    rules.push(get_next_image_rule());

    Ok(rules)
}

/// Returns a list of module rules which apply server-side, Next.js-specific
/// transforms, but which are only applied to internal modules.
pub async fn get_next_server_internal_transforms_rules(
    context_ty: ServerContextType,
    mdx_rs: bool,
) -> Result<Vec<ModuleRule>> {
    let mut rules = vec![];

    match context_ty {
        ServerContextType::Pages { .. } => {
            // Apply next/font transforms to foreign code
            rules.push(get_next_font_transform_rule(mdx_rs));
        }
        ServerContextType::PagesApi { .. } => {}
        ServerContextType::PagesData { .. } => {}
        ServerContextType::AppSSR { .. } => {
            rules.push(get_next_font_transform_rule(mdx_rs));
        }
        ServerContextType::AppRSC {
            client_transition, ..
        } => {
            rules.push(get_next_font_transform_rule(mdx_rs));
            if let Some(client_transition) = client_transition {
                rules.push(get_next_css_client_reference_transforms_rule(
                    client_transition,
                ));
            }
            {}
        }
        ServerContextType::AppRoute { .. } => {}
        ServerContextType::Middleware { .. } => {}
        ServerContextType::Instrumentation { .. } => {}
    };

    Ok(rules)
}
