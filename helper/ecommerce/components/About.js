import Image from "next/image";
import aboutImage from "public/images/about-img.png"

const About = () => {
    return (
        <section className="about_section layout_padding">
            <div className="container  ">

                <div className="row">
                    <div className="col-md-6 ">
                        <div className="img-box">
                            <Image src={aboutImage} placeholder='blur' width={445} height={608} alt="about-image" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="detail-box">
                            <div className="heading_container">
                                <h2>
                                    لورم ایپسوم متن
                                </h2>
                            </div>
                            <p>
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                                چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                                تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در
                                شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها
                                شناخت
                            </p>
                            <a href="">
                                مشاهده بیشتر
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;