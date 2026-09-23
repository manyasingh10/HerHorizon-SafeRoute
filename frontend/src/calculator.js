/* HerHorizon calculator / discreet unlock input. */
/* calculator */
function renderCalc(){$('calcDisplay').textContent=S.val;}
document.querySelectorAll('[data-num]').forEach(b=>b.addEventListener('click',()=>{const d=b.dataset.num;S.val=(S.val==='0'&&d!=='.')?d:(d==='.'&&S.val.includes('.')?S.val:S.val+d);S.seq+=d;renderCalc();checkCode();}));
document.querySelectorAll('[data-act]').forEach(b=>b.addEventListener('click',()=>doCalc(b.dataset.act)));
function doCalc(op){S.seq+=op;
  if(op==='C'){S.val='0';$('calcHistory').innerHTML='&nbsp;';}
  else if(op==='='){try{const s=S.val.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-');$('calcHistory').textContent=S.val+' =';S.val=String(Function(`'use strict';return(${s})`)());}catch{S.val='Error';}}
  else if(['+','-','*','/'].includes(op)){S.val+=` ${op==='*'?'×':op==='/'?'÷':op==='-'?'−':'+'} `;}
  else if(op==='+/-'){S.val=S.val.startsWith('-')?S.val.slice(1):'-'+S.val;}
  else if(op==='%'){S.val=String(parseFloat(S.val)/100);}
  renderCalc();checkCode();}
function checkCode(){const s=S.seq;if(s.includes(S.code)||s.includes('98.6+=')||s.includes('999=')||s.endsWith('911=')){S.seq='';unlock();}if(S.seq.length>30)S.seq=S.seq.slice(-12);}
