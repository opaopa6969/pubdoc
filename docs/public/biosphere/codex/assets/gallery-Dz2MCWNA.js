import{m as u,C as g,e as $}from"./gallery-C74eYaVS.js";const l=t=>String(t).replace(/[&<>"']/g,d=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[d]),c=document.querySelector("#codex");async function h(){const t=await(await fetch("/public/biosphere/codex/data/rules.json")).json(),d=[{id:"",name:"基本",description:"形質を選ばなかった姿"},...u],o={species:t.species[0].id,stage:5,role:"forager",trait:""};c.innerHTML=`
  <header class="codex-head">
    <div>
      <p class="eyebrow">THE EVOLUTION ARCHIVE</p>
      <h1>進化図鑑<small>${t.species.length}系統 × ${t.stages.length}段階 × ${t.roles.length}役割 × ${d.length}形質 = ${t.species.length*t.stages.length*t.roles.length*d.length} 形態</small></h1>
    </div>
    <a class="codex-back" href="./">← 攻略記事へ</a>
  </header>
  <div class="codex-body">
    <div class="codex-stage"><div id="viewer"></div>
      <div class="codex-caption"><p id="model-code"></p><h2 id="model-name"></h2><p id="model-note"></p></div>
    </div>
    <aside class="codex-picks">
      ${[["species","系統",t.species.map(e=>[e.id,e.name])],["stage","進化段階",t.stages.map(e=>[String(e.order),`${e.order}. ${e.name}`])],["role","群れでの役割",t.roles.map(e=>[e.id,e.name])],["trait","形質",d.map(e=>[e.id,e.name])]].map(([e,a,n])=>`<section><h3>${a}</h3><div class="codex-options" data-group="${e}">${n.map(([i,s])=>`<button data-key="${e}" data-value="${l(i)}">${l(s)}</button>`).join("")}</div></section>`).join("")}
      <button id="download" class="codex-download">3Dモデルを保存 <span>GLB ↓</span></button>
      <p class="codex-note">形はブラウザ内で手続き的に生成しています。画像ではありません。ドラッグで回転、スクロールで拡大。</p>
    </aside>
  </div>`;const r=new g(document.querySelector("#viewer"),t);function p(){const e=t.species.find(s=>s.id===o.species),a=t.stages.find(s=>s.order===Number(o.stage)),n=t.roles.find(s=>s.id===o.role),i=d.find(s=>s.id===o.trait);r.show(o.species,Number(o.stage),o.role,o.trait||null),document.querySelector("#model-code").textContent=`${e.latin} / ${String(a.order).padStart(2,"0")} / ${n.id.toUpperCase()}${i.id?` / ${i.id.toUpperCase()}`:""}`,document.querySelector("#model-name").textContent=`${e.forms[a.order-1]}・${n.name}${i.id?`（${i.name}）`:""}`,document.querySelector("#model-note").textContent=i.id?i.description:`第${a.order}段階 — ${a.name}`;for(const s of c.querySelectorAll(".codex-options button"))s.classList.toggle("on",o[s.dataset.key]===s.dataset.value)}c.addEventListener("click",e=>{const a=e.target.closest("[data-key]");a&&(o[a.dataset.key]=a.dataset.value,p())}),document.querySelector("#download").addEventListener("click",async()=>{const e=new Blob([await $(r.creature)],{type:"model/gltf-binary"}),a=URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download=`biosphere-${o.species}-${o.stage}-${o.role}${o.trait?`-${o.trait}`:""}.glb`,n.click(),URL.revokeObjectURL(a)}),p();const m=e=>{r.render(e),requestAnimationFrame(m)};requestAnimationFrame(m),window.addEventListener("resize",()=>r.resize())}h().catch(t=>{c.innerHTML=`<p style="padding:40px;color:#e39a86">図鑑を開けませんでした: ${l(t.message||t)}</p>`});
