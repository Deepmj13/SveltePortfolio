<script>
    import { onMount } from "svelte";
    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";

    gsap.registerPlugin(ScrollTrigger);

    let services = [
        {
            id: "01",
            title: "Creative Development",
            description:
                "Building high-performance, accessible, and visually stunning web experiences using modern technologies.",
            tags: [
                "Web Development",
                "Mobile App Development",
                "Performance Optimization",
            ],
        },
        {
            id: "02",
            title: "UI/UX Design",
            description:
                "Crafting intuitive and minimalist interfaces that prioritize user experience and brand identity.",
            tags: [
                "Minimalist Aesthetics",
                "Design Systems",
                "User Research",
                "Prototyping",
            ],
        },
        {
            id: "03",
            title: "Motion & Interaction",
            description:
                "Enhancing user engagement through fluid transitions, micro-interactions, and immersive motion design.",
            tags: [
                "Interaction Design",
                "Smooth Transitions",
                "Web Animation",
                "Creative Coding",
            ],
        },
    ];

    let activeIndex = null;
    let section;

    onMount(() => {
        // Refresh ScrollTrigger to ensure correct positions with Lenis
        ScrollTrigger.refresh();

        // Entrance animation for the section
        gsap.from(".service-item", {
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                toggleActions: "play none none none",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "all", // Ensure styles are cleared after animation
        });
    });
</script>

<section class="services-section" bind:this={section}>
    <div class="container">
        <header class="section-header">
            <p class="subtitle">EXPERTISE</p>
            <div class="title-wrap">
                <h2 class="title">WHAT<br />I DO //</h2>
            </div>
        </header>

        <div class="services-list">
            {#each services as service, i}
                <div
                    class="service-item {activeIndex === i
                        ? 'active'
                        : ''} {activeIndex !== null && activeIndex !== i
                        ? 'dimmed'
                        : ''}"
                    role="button"
                    tabindex="0"
                    on:mouseenter={() => (activeIndex = i)}
                    on:mouseleave={() => (activeIndex = null)}
                >
                    <div class="service-main">
                        <span class="service-id">{service.id}</span>
                        <h3 class="service-title">{service.title}</h3>
                        <div class="tags">
                            {#each service.tags as tag}
                                <span class="tag">{tag}</span>
                            {/each}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .services-section {
        padding: 10vh 0;
        min-height: 70vh;
        background-color: var(--bg);
        color: var(--text-primary);
        font-family: "Inter", sans-serif;
        position: relative;
        z-index: 10;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
    }

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 5rem;
        width: 100%;
    }

    .subtitle {
        font-size: 0.9rem;
        letter-spacing: 3px;
        color: var(--text-secondary);
        margin-top: 0.5rem;
    }

    .title-wrap {
        text-align: right;
    }

    .title {
        font-size: clamp(3rem, 7vw, 7rem);
        font-weight: 900;
        margin: 0;
        text-transform: uppercase;
        line-height: 0.85;
        letter-spacing: -3px;
    }

    .services-list {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .service-item {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding: 1.5rem 0;
        cursor: pointer;
        transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        overflow: hidden;
    }

    .service-item:last-child {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .service-item.dimmed {
        opacity: 0.3;
        transform: scale(0.96);
        filter: blur(2px);
    }

    .service-item.active {
        opacity: 1;
        transform: scale(1.02);
    }

    .service-main {
        display: flex;
        align-items: start;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        transition: 300ms;
    }

    .service-main:hover > .tags {
        opacity: 1;
    }
    .service-id {
        font-family: "Playfair Display", serif;
        font-size: 1rem;
        color: var(--text-secondary);
        font-style: italic;
        width: 50px;
    }

    .service-title {
        font-size: clamp(1.8rem, 2vw, 3.5rem);
        font-weight: 700;
        margin: 0;
        transition:
            transform 0.4s ease,
            color 0.4s ease;
        flex: 1;
    }

    .tags {
        display: flex;
        opacity: 0;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.6rem;
        transition: 300ms;
    }

    .tag {
        font-size: 0.7rem;
        padding: 0.3rem 0.8rem;
        border: 1px solid var(--text-secondary);
        border-radius: 50px;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 1px;
        white-space: nowrap;
    }

    @media (max-width: 768px) {
        .service-main {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        }

        .tags {
            margin-left: 0;
        }

        .service-id {
            width: auto;
        }
    }
</style>
