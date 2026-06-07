"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

import BatteryIcon from "@/assets/icons/BatteryBold.svg";
import BlueToothIcon from "@/assets/icons/BluetoothBold.svg";
import ColorThemeIcon from "../_assets/icons/theme.svg";

const OverviewSection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const pivotRef = useRef<THREE.Group | null>(null);
  const modelContainerRef = useRef<HTMLDivElement>(null);

  function initThreeScene(container: HTMLDivElement) {
    let modelSize: THREE.Vector3 | undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.toneMappingExposure = 1.0;

    container.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment()).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    scene.add(new THREE.AmbientLight(0xffffff, 20));

    const mainLight = new THREE.DirectionalLight(0xffffff, 20);
    mainLight.position.set(1, 2, 3);
    mainLight.castShadow = true;
    mainLight.shadow.bias = -0.001;
    mainLight.shadow.mapSize.set(1024, 1024);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1);
    fillLight.position.set(-2, 0, -2);
    scene.add(fillLight);

    const setupModel = () => {
      if (!pivotRef.current || !modelSize) return; // CHANGE
      const isMobile = window.innerWidth < 1000;
      const center = new THREE.Box3()
        .setFromObject(pivotRef.current) // CHANGE
        .getCenter(new THREE.Vector3());

      pivotRef.current.position.set(
        // CHANGE
        isMobile ? center.x + modelSize.x * 1 : -center.x - modelSize.x * 0.4,
        -center.y + modelSize.y * 0.085,
        -center.z,
      );
      pivotRef.current.rotation.z = isMobile // CHANGE
        ? 0
        : THREE.MathUtils.degToRad(-25);
      camera.position.set(
        0,
        0,
        Math.max(modelSize.x, modelSize.y, modelSize.z) * (isMobile ? 2 : 1.25),
      );
      camera.lookAt(0, 0, 0);
    };

    new GLTFLoader().load(
      "/stanlybottle/3dmodels/bottle/scene.gltf",
      (gltf) => {
        modelRef.current = gltf.scene;
        modelRef.current.traverse((node) => {
          if ((node as THREE.Mesh).isMesh) {
            const mat = (node as THREE.Mesh)
              .material as THREE.MeshStandardMaterial;
            mat.metalness = 0.05;
            mat.roughness = 0.9;
            mat.envMapIntensity = 9;
          }
        });
        modelSize = new THREE.Box3()
          .setFromObject(modelRef.current)
          .getSize(new THREE.Vector3());

        const pivot = new THREE.Group();
        pivot.add(modelRef.current);
        pivotRef.current = pivot;
        scene.add(pivot);

        setupModel();
      },
    );

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      setupModel();
    };
    window.addEventListener("resize", handleResize);

    // Return cleanup so useGSAP can call it
    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
    };
  }

  useGSAP(() => {
    const scrollAmount = window.innerWidth * 2.7;

    const header1Split = SplitText.create(".header-1 h1", {
      type: "chars",
    });

    let infoVisible = false;

    const info1Timeline = gsap.timeline({ paused: true });
    info1Timeline.from(".header-infos .info-1", {
      yPercent: -20,
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.5,
    });
    const info2Timeline = gsap.timeline({ paused: true });
    info2Timeline.from(".header-infos .info-2", {
      yPercent: 20,
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.5,
    });

    const infoSlide1Timeline = gsap.timeline({ paused: true });
    infoSlide1Timeline.from([".icon-1", ".title-1", ".para-1"], {
      yPercent: 100,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.08,
    });

    const infoSlide2Timeline = gsap.timeline({ paused: true });
    infoSlide2Timeline.from([".icon-2", ".title-2", ".para-2"], {
      yPercent: 100,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.08,
    });

    let revealed = false;

    gsap.from(header1Split.chars, {
      yPercent: 200,
      stagger: 0.025,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".test-section",
        start: "top 40%",
        toggleActions: "play none none reverse",
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".test-section",
        start: "top top",
        end: `+=${scrollAmount}px`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: ({ progress }) => {
          if (modelRef.current) {
            modelRef.current.rotation.y = progress * Math.PI * 4;
          }

          if (progress >= 0.03 && progress <= 0.3 && !infoVisible) {
            info1Timeline.play();
            info2Timeline.play();
            infoVisible = true;
          } else if ((progress < 0.03 || progress > 0.3) && infoVisible) {
            info1Timeline.reverse();
            info2Timeline.reverse();
            infoVisible = false;
          }

          const markSize =
            progress < 0.37
              ? 0
              : progress > 0.42
                ? 100
                : 100 * ((progress - 0.37) / 0.1);
          gsap.to(".circular-mask", {
            clipPath: `circle(${markSize}% at 50% 50%)`,
          });

          // reveal after horizontal finished
          if (progress > 0.7 && !revealed) {
            infoSlide1Timeline.play();
            infoSlide2Timeline.play();

            revealed = true;
          }

          if (progress < 0.7 && revealed) {
            infoSlide1Timeline.reverse();
            infoSlide2Timeline.reverse();

            revealed = false;
          }

          const sepProgress = gsap.utils.clamp(0, 1, (progress - 0.7) / 0.15);

          gsap.set(".seperator", {
            width: `${sepProgress * 100}%`,
          });
        },
      },
    });

    tl.to(".test-section", {
      x: `-${scrollAmount}px`,
      ease: "power1.inOut",
    }).to(
      overlayRef.current,
      {
        x: `${scrollAmount}px`,
        ease: "power1.inOut",
      },
      "<",
    );

    gsap.timeline({
      scrollTrigger: {
        trigger: ".passiflora-section",
        start: "top bottom", // when passiflora-section enters viewport bottom
        end: "top 20%", // until it's 30% in — model invisible by then
        scrub: 1,
        onUpdate: ({ progress }) => {
          if (modelRef.current) {
            modelRef.current.rotation.y = Math.PI * 4 + progress * Math.PI * 2;
          }
        },
      },
    });

    gsap.to(".circular-mask", {
      backgroundColor: "#ffffff",
      duration: 0.6,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".passiflora-section",
        start: "top bottom",
        end: "top 95%",
        scrub: true,
      },
    });

    const cleanup = initThreeScene(modelContainerRef.current!);
    return () => cleanup?.();
  });

  return (
    <section className="test-section relative w-full h-screen bg-white ">
      {/* Always-centered overlay — lives inside the section, counter-animates */}
      <div
        ref={overlayRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-1 pointer-events-none "
      >
        <div className="relative w-full h-full">
          <div
            className="circular-mask absolute top-0 left-0 w-full h-full  z-1"
            style={{
              clipPath: "circle(0% at 50% 50%)",
              backgroundColor: "#000000",
            }}
          />

          <div
            ref={modelContainerRef}
            className="model-container absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full h-full z-3 "
          ></div>

          <div
            style={{ mixBlendMode: "difference" }}
            className="footer-infos absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex gap-44 w-4/5 h-3/4 z-2 "
          >
            <div className="f-info-1 flex-1 flex flex-col gap-6">
              <div className="w-10 h-10 overflow-hidden">
                <BatteryIcon className="icon-1 w-10 h-10 text-white" />
              </div>

              <div className="seperator w-0 h-0.5 ml-auto bg-zinc-500 " />

              <div className="overflow-hidden">
                <h2 className="title-1 text-5xl text-white">long life</h2>
              </div>

              <div className="overflow-hidden">
                <p className="para-1 text-sm text-white ">
                  you can use your bottle for a week between <br /> charges, and
                  it takes about one hour to <br /> recharge fully with any
                  usb-c cable
                </p>
              </div>
            </div>

            <div className="f-info-2 flex-1 flex flex-col gap-6 justify-end">
              <div className="w-10 h-10 ml-[50%] overflow-hidden">
                <BlueToothIcon className="icon-2 w-10 h-10  text-white" />
              </div>

              <div className="seperator w-0 h-0.5 bg-zinc-500" />

              <div className="overflow-hidden">
                <h2 className="title-2 ml-[50%] text-5xl text-white">
                  connected
                </h2>
              </div>

              <div className="overflow-hidden">
                <p className="para-2 ml-[50%] text-sm text-white">
                  yout pod connects via bluetooth to the app <br />
                  on your smartphone, allowing you to make new <br />
                  and unique discoveries
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={sliderRef} className="flex w-full h-full ">
        <div className="header-1 relative flex items-center shrink-0 min-w-[200vw] h-svh">
          <h1 className="w-full text-[15vw] font-semibold leading-tight tracking-[-0.02em]">
            It all starts with a
          </h1>
        </div>

        <div className="header-2 relative flex items-center shrink-0 min-w-[150vw] h-svh text-white z-1 ">
          <h1 className="w-full text-[15vw] font-semibold leading-tight tracking-[-0.02em]">
            Stanly bottle
          </h1>
        </div>
      </div>

      <div className="header-infos absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex gap-60 w-3/4 h-3/4 ">
        <div className="info-1 flex-1 flex items-start justify-start">
          <p className="text-sm text-black font-medium leading-6 overflow-hidden ">
            The stanly is designed to house our natural bottle and <br />{" "}
            provide a digital bridge with AI brain. With each sip, <br />
            the bottle exchange infomation with the app, generating a <br />{" "}
            journal of your bottle use, over time
          </p>
        </div>

        <div className="info-2 flex-1 flex items-end justify-end ">
          <p className="text-sm text-black font-medium leading-6 overflow-hidden ">
            With the help of your input, stanly learns more about how <br />
            different bottle benefit you, helping to create a personal <br />
            hydrate routine.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
