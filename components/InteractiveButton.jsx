'use client';
import { useEffect, useRef } from 'react';
import styles from '../app/simple/simple.module.css';

export default function InteractiveButton() {
 const linkRef=useRef(null);
 const canvasRef=useRef(null);
 useEffect(()=>{
  const link=linkRef.current,canvas=canvasRef.current;
  let stopped=false,cleanup;
  import('three').then(THREE=>{
   if(stopped)return;
   let renderer;
   try { renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true}); }
   catch { return; }
   renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
   renderer.setSize(180,68,false);
   const scene=new THREE.Scene();
   const camera=new THREE.OrthographicCamera(-2.25,2.25,.85,-.85,.1,30);
   camera.position.set(0,0,6.6);
   const shape=new THREE.Shape();
   const w=3.8,h=1.05,r=.22;
   shape.moveTo(-w/2+r,-h/2);shape.lineTo(w/2-r,-h/2);
   shape.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);shape.lineTo(w/2,h/2-r);
   shape.quadraticCurveTo(w/2,h/2,w/2-r,h/2);shape.lineTo(-w/2+r,h/2);
   shape.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);shape.lineTo(-w/2,-h/2+r);
   shape.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);
   const geometry=new THREE.ExtrudeGeometry(shape,{depth:.16,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.07,bevelThickness:.07});
   geometry.center();
   const accent=getComputedStyle(link).getPropertyValue('--link').trim()||'#9966dd';
   const face=new THREE.MeshBasicMaterial({color:accent});
   const edge=new THREE.MeshStandardMaterial({color:0x63349a,roughness:.45,metalness:.12});
   const material=[face,edge];
   const button=new THREE.Mesh(geometry,material);scene.add(button);
   scene.add(new THREE.AmbientLight(0xffffff,1.2));
   const light=new THREE.DirectionalLight(0xffffff,2);light.position.set(-2,4,5);scene.add(light);
   const rim=new THREE.DirectionalLight(0xffffff,.6);rim.position.set(3,-2,1);scene.add(rim);
   const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   let frame=0,x=.12,y=-.1,shakeStarted=performance.now()-1000,strength=1;
   button.rotation.set(x,y,0);
   const draw=()=>{
    frame=0;if(stopped)return;
    button.rotation.x+=(x-button.rotation.x)*.18;
    button.rotation.y+=(y-button.rotation.y)*.18;
    const elapsed=(performance.now()-shakeStarted)/1000;
    const envelope=elapsed<.85?Math.exp(-elapsed*5)*strength:0;
    const wobble=Math.sin(elapsed*32)*envelope;
    button.rotation.z=wobble*.025;
    button.position.x=wobble*.04;
    link.style.setProperty('--shake-x',`${button.position.x*40}px`);
    link.style.setProperty('--shake-angle',`${-button.rotation.z}rad`);
    link.style.setProperty('--tilt-x',`${-button.rotation.x}rad`);
    link.style.setProperty('--tilt-y',`${button.rotation.y}rad`);
    renderer.render(scene,camera);
    if(envelope||Math.abs(x-button.rotation.x)+Math.abs(y-button.rotation.y)>.001)frame=requestAnimationFrame(draw);
   };
   const animate=()=>{if(!frame)frame=requestAnimationFrame(draw);};
   const shake=(amount=1)=>{if(reduced)return;strength=amount;shakeStarted=performance.now();animate();};
   const enter=()=>shake();
   const press=()=>shake(.8);
   const move=event=>{if(reduced||event.pointerType==='touch')return;const box=link.getBoundingClientRect();x=(.5-(event.clientY-box.top)/box.height)*.45;y=((event.clientX-box.left)/box.width-.5)*.45;animate();};
   const reset=()=>{x=.12;y=-.1;animate();};
   const focus=()=>{if(!reduced){x=-.15;y=.15;shake();}};
   const lost=event=>{event.preventDefault();link.removeAttribute('data-rendered');};
   link.addEventListener('pointerenter',enter);link.addEventListener('pointerdown',press);
   link.addEventListener('pointermove',move);link.addEventListener('pointerleave',reset);
   link.addEventListener('focus',focus);link.addEventListener('blur',reset);
   canvas.addEventListener('webglcontextlost',lost);
   renderer.render(scene,camera);link.dataset.rendered='true';
   cleanup=()=>{cancelAnimationFrame(frame);link.removeEventListener('pointerenter',enter);link.removeEventListener('pointerdown',press);link.style.removeProperty('--shake-x');link.style.removeProperty('--shake-angle');link.style.removeProperty('--tilt-x');link.style.removeProperty('--tilt-y');link.removeEventListener('pointermove',move);link.removeEventListener('pointerleave',reset);link.removeEventListener('focus',focus);link.removeEventListener('blur',reset);canvas.removeEventListener('webglcontextlost',lost);link.removeAttribute('data-rendered');geometry.dispose();face.dispose();edge.dispose();renderer.dispose();};
  }).catch(()=>{/* The styled HTML link remains usable without WebGL. */});
  return ()=>{stopped=true;cleanup?.();};
 },[]);
 return <a ref={linkRef} className={styles.interactiveButton} href="https://www.mayaan.site" aria-label="Open the interactive portfolio"><canvas ref={canvasRef} aria-hidden="true"/><span>Interactive version <span aria-hidden="true">↗</span></span></a>;
}
