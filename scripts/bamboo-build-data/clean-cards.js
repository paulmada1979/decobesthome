// Make clean (logo-free) studio images per variant into OUTDIR/<slug>.png
const sharp=require("C:/Projects/decobesthome/node_modules/sharp");const fs=require("fs");const path=require("path");
const OUT="C:/Projects/Deco files/Clean studio";fs.mkdirSync(OUT,{recursive:true});
const D="C:/Users/MelgerHulsebos/Downloads/deco/";const F="C:/Projects/decobesthome/public/images/";
const jobs=JSON.parse(fs.readFileSync(process.argv[2],"utf8"));
const WHITE=246;
async function strip(file,maxY){
  const {data,info}=await sharp(file).flatten({background:"#fff"}).greyscale().raw().toBuffer({resolveWithObject:true});
  const W=info.width,H=info.height,px=(x,y)=>data[y*W+x];
  const rowDark=(y,x0,x1)=>{for(let x=x0;x<x1;x++)if(px(x,y)<WHITE)return true;return false};
  const rects=[];const notes=[];
  // logo top-left
  let top=-1;for(let y=0;y<Math.round(H*.2);y++)if(rowDark(y,0,Math.round(W*.45))){top=y;break}
  if(top>=0){let y=top,gap=0,bottom=top;for(;y<(maxY||Math.round(H*.3));y++){if(rowDark(y,0,Math.round(W*.45))){bottom=y;gap=0}else if(++gap>=10)break}
    let maxX=0;for(let yy=top;yy<=bottom;yy++)for(let x=0;x<Math.round(W*.45);x++)if(px(x,yy)<WHITE&&x>maxX)maxX=x;
    if(gap<10&&!maxY)notes.push("LOGO-NO-GAP");rects.push({x:0,y:0,w:Math.min(W,maxX+8),h:bottom+4});notes.push(`logo ${top}-${bottom} x<${maxX}`)}
  // corner credit bottom-right
  const cx0=Math.round(W*.6);let b=-1;for(let y=H-1;y>H*.9;y--)if(rowDark(y,cx0,W)){b=y;break}
  if(b>=0){let y=b,gap=0,t=b;for(;y>H*.85;y--){if(rowDark(y,cx0,W)){t=y;gap=0}else if(++gap>=3)break}
    let minX=W;for(let yy=t;yy<=b;yy++)for(let x=cx0;x<W;x++)if(px(x,yy)<WHITE&&x<minX)minX=x;
    if(gap<3||b-t>Math.round(H*.05))notes.push("CREDIT-SUSPECT");else{rects.push({x:minX-4,y:t-3,w:W-minX+4,h:H-t+3});notes.push(`credit ${t}-${b} x>${minX}`)}}
  const comps=rects.map(r=>({input:{create:{width:r.w,height:r.h,channels:3,background:"#fff"}},left:r.x,top:r.y}));
  return {img:sharp(file).flatten({background:"#fff"}).composite(comps),notes};
}
(async()=>{for(const [slug,j] of Object.entries(jobs)){
  const out=path.join(OUT,slug+".png");
  if(j.main){await sharp(D+j.main).rotate().flatten({background:"#fff"}).png().toFile(out);console.log(slug,"main");}
  else{const {img,notes}=await strip(F+j.card,j.logoMaxY);await img.png().toFile(out);console.log(slug,"strip",notes.join("; "));}
}})();
