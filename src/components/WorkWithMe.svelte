<script>
    import { onMount, onDestroy } from "svelte";
    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";

    gsap.registerPlugin(ScrollTrigger);

    let section;
    let headline;
    let marqueeContainer;
    let magneticBtn;
    let contactSection;

    let mouseX = 0;
    let mouseY = 0;
    let btnX = 0;
    let btnY = 0;

    onMount(() => {
        // --- Headline Scroll Animation ---
        gsap.from(headline, {
            scrollTrigger: {
                trigger: headline,
                start: "top 90%",
                end: "bottom 55%",
                scrub: 1,
            },
            x: -100,
            opacity: 0,
            letterSpacing: "20px",
            filter: "blur(10px)",
        });

        // --- Marquee Animation ---
        gsap.to(".marquee-part", {
            xPercent: -100,
            repeat: -1,
            duration: 20,
            ease: "none",
        });

        // --- Magnetic Button Logic ---
        const handleMouseMove = (e) => {
            const isDesktop = window.innerWidth > 1024;
            if (!isDesktop || !magneticBtn) return;

            const rect = magneticBtn.getBoundingClientRect();
            const btnCenterX = rect.left + rect.width / 2;
            const btnCenterY = rect.top + rect.height / 2;

            const dist = Math.hypot(
                e.clientX - btnCenterX,
                e.clientY - btnCenterY,
            );

            if (dist < 150) {
                btnX = (e.clientX - btnCenterX) * 0.4;
                btnY = (e.clientY - btnCenterY) * 0.4;
            } else {
                btnX = 0;
                btnY = 0;
            }

            gsap.to(magneticBtn, {
                x: btnX,
                y: btnY,
                duration: 0.6,
                ease: "power2.out",
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    });
</script>

<section class="work-container" bind:this={section}>
    <!-- Top Marquee -->
    <div class="marquee" bind:this={marqueeContainer}>
        <div class="marquee-inner">
            <div class="marquee-part">
                LET'S WORK TOGETHER • READY TO COLLABORATE •
            </div>
            <div class="marquee-part">
                LET'S WORK TOGETHER • READY TO COLLABORATE •
            </div>
            <div class="marquee-part">
                LET'S WORK TOGETHER • READY TO COLLABORATE •
            </div>
            <div class="marquee-part">
                LET'S WORK TOGETHER • READY TO COLLABORATE •
            </div>
        </div>
    </div>

    <div class="main-layout">
        <div class="sticky-side">
            <h2 class="headline" bind:this={headline}>
                WORK<br />WITH<br /><span class="outline">ME</span>
            </h2>
        </div>

        <div class="scroll-side">
            <div class="info-block">
                <p class="tagline">HAVE A PROJECT IN MIND?</p>
                <div class="contact-details" bind:this={contactSection}>
                    <p>Based in Gujarat, INDIA</p>
                    <p>Available for Freelance & Full-time</p>
                </div>

                <div class="btn-wrap">
                    <a
                        href="mailto:deepmujpara@gmail.com"
                        class="magnetic-btn"
                        bind:this={magneticBtn}
                    >
                        <div class="btn-content">
                            <span>GET IN TOUCH</span>
                        </div>
                    </a>
                </div>
            </div>

            <div class="image-showcase">
                <div class="floating-text">01 // CREATIVE DEV</div>
            </div>
        </div>
    </div>
</section>

<style>
    .work-container {
        min-height: 200vh; /* Extra height for scroll effects */
        background-color: var(--bg);
        color: var(--text-primary);
        font-family: "Inter", sans-serif;
        padding-top: 10vh;
        position: relative;
        overflow: hidden;
    }

    /* Marquee Styles */
    .marquee {
        width: 100vw;
        overflow: hidden;
        white-space: nowrap;
        background: var(--text-primary);
        color: var(--bg);
        padding: 1rem 0;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        font-weight: 900;
        font-size: 1.5rem;
        letter-spacing: 2px;
    }

    .marquee-inner {
        display: flex;
        width: fit-content;
    }

    .marquee-part {
        flex-shrink: 0;
        padding-right: 20px;
    }

    .main-layout {
        display: flex;
        padding: 10vh 5vw;
        gap: 10vw;
    }

    .sticky-side {
        flex: 1;
        position: sticky;
        top: 15vh;
        height: min-content;
    }

    .headline {
        font-size: clamp(4rem, 12vw, 12rem);
        font-weight: 900;
        line-height: 0.85;
        margin: 0;
        letter-spacing: -5px;
        text-transform: uppercase;
    }

    .outline {
        color: transparent;
        -webkit-text-stroke: 2px var(--text-primary);
    }

    .scroll-side {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 40vh; /* Space between details and image */
    }

    .info-block {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .tagline {
        font-size: 1.2rem;
        color: var(--text-secondary);
        letter-spacing: 3px;
    }

    .contact-details {
        font-family: "Playfair Display", serif;
        font-size: clamp(1.5rem, 3vw, 3rem);
        line-height: 1.2;
    }

    .btn-wrap {
        margin-top: 4rem;
        width: 200px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .magnetic-btn {
        width: 180px;
        height: 180px;
        background: var(--text-primary);
        color: var(--bg);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        font-weight: 900;
        font-size: 0.9rem;
        transition: transform 0.1s linear;
        border: none;
        cursor: pointer;
    }

    .btn-content {
        pointer-events: none;
    }

    .image-showcase {
        position: relative;
        padding-bottom: 20vh;
    }

    .floating-text {
        position: absolute;
        bottom: 15vh;
        right: -2rem;
        font-size: 5vw;
        font-weight: 900;
        color: var(--text-secondary);
        opacity: 0.2;
        pointer-events: none;
        z-index: -1;
    }

    /* Responsive */
    @media (max-width: 1024px) {
        .main-layout {
            flex-direction: column;
            gap: 10vh;
        }

        .sticky-side {
            position: relative;
            top: 0;
        }

        .outline {
            color: var(--text-primary);
            -webkit-text-stroke: 0;
        }

        .scroll-side {
            gap: 15vh;
        }

        .btn-wrap {
            margin: 2rem auto;
        }
    }
</style>
