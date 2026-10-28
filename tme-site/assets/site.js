
(function(){
var $=function(i){return document.getElementById(i)};
$('yr').textContent=new Date().getFullYear();
var nav=$('nav');function sc(){nav.classList.toggle('sc',scrollY>40)}addEventListener('scroll',sc,{passive:true});sc();
var d=$('drawer'),s=$('scrim');function op(){d.classList.add('on');s.classList.add('on')}function cl(){d.classList.remove('on');s.classList.remove('on')}
$('burger').onclick=op;$('dx').onclick=cl;s.onclick=cl;d.querySelectorAll('a').forEach(function(a){a.onclick=cl});
var els=document.querySelectorAll('.rv,.strand');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});els.forEach(function(e){io.observe(e)})}else{els.forEach(function(e){e.classList.add('in')})}
/* gallery: auto-loads images/gallery/look-1..24 (.jpg/.jpeg/.png/.webp) if present */
var gal=$('gal');if(gal){var G=["img_6701.jpg", "img_6703.jpg", "img_6704.jpg", "img_6708.jpg", "img_6709.jpg", "img_6710.jpg", "img_6711.jpg", "img_6712.jpg", "img_6713.jpg", "img_6714.jpg", "img_6715.jpg", "img_6716.jpg", "img_6717.jpg", "img_6718.jpg", "img_6720.jpg", "img_6721.jpg", "img_6722.jpg", "img_6723.jpg", "img_6724.jpg", "img_6725.jpg", "img_6726.jpg", "img_6727.jpg", "img_6730.jpg", "img_6731.jpg"];G.forEach(function(fn){var a=document.createElement('a');a.href='images/gallery/'+fn;a.target='_blank';var i=new Image();i.alt='The Mane Experience work';i.loading='lazy';i.onerror=function(){a.remove()};a.appendChild(i);gal.appendChild(a);i.src='images/gallery/'+fn});setTimeout(function(){if(!gal.children.length)$('galEmpty').hidden=false},2500)}
var PRICES={"12A": {"10": 80, "12": 90, "14": 115, "16": 145, "18": 170, "20": 185, "22": 210, "24": 230, "26": 250, "28": 265, "30": 290}, "13A": {"18": 180, "20": 215, "22": 255, "24": 275, "26": 295, "28": 315}};
document.addEventListener('input',function(e){var w=e.target.closest&&e.target.closest('.f.bad');if(w)w.classList.remove('bad')});document.addEventListener('change',function(e){var w=e.target.closest&&e.target.closest('.f.bad');if(w)w.classList.remove('bad')});
/* collection cart */
var cf=$('cartForm');if(cf){var cart=[];
 function price(card){if(card.dataset.rm)return card.dataset.price?+card.dataset.price:null;var g=card.dataset.g,l=card.querySelector('.pl').value;return PRICES[g]&&PRICES[g][l]?PRICES[g][l]:null}
 document.querySelectorAll('.prod').forEach(function(card){var pp=card.querySelector('.pp');
  function upd(){if(card.dataset.rm)return;var p=price(card);pp.textContent=p?'$'+p+' per bundle':'Price confirmed on request'}
  if(!card.dataset.rm){card.querySelector('.pl').onchange=upd;upd()}
  card.querySelector('.add').onclick=function(){var p=price(card),it;
   if(card.dataset.rm){it={label:card.dataset.name,qty:1,unit:p}}else{var q=+card.querySelector('.pq').value,l=card.querySelector('.pl').value;it={label:card.dataset.name+' '+l+'"',qty:q,unit:p}}
   cart.push(it);draw();var tt=document.createElement('div');tt.className='toast';tt.textContent='Added to your request';document.body.appendChild(tt);setTimeout(function(){tt.remove()},1500);this.textContent='Added ✓';var b=this;setTimeout(function(){b.textContent=card.dataset.rm?'Add inquiry to request':'Add to request'},1200)}});
 function plain(){return cart.map(function(i){return i.qty+' × '+i.label+(i.unit?' @ $'+i.unit+' = $'+i.unit*i.qty:' (price on request)')}).join('\n')}
 function tot(){return cart.reduce(function(s,i){return s+(i.unit?i.unit*i.qty:0)},0)}
 function draw(){var pl=$('pill');pl.hidden=!cart.length;$('pillN').textContent=cart.reduce(function(a,i){return a+i.qty},0);var l=$('cartList');if(!cart.length){l.innerHTML='<p class="empty">Nothing added yet. Choose bundles or a wig above.</p>';$('cartTotal').hidden=true;return}
  l.innerHTML=cart.map(function(i,n){return '<div class="ci"><span>'+i.qty+' × '+i.label+'</span><span>'+(i.unit?'$'+i.unit*i.qty:'on request')+' <button type="button" data-n="'+n+'" aria-label="Remove">&times;</button></span></div>'}).join('');
  l.querySelectorAll('button').forEach(function(b){b.onclick=function(){cart.splice(+b.dataset.n,1);draw()}});
  var t=tot(),el=$('cartTotal');el.hidden=!t;el.innerHTML='<span>Estimated total</span><span>$'+t+'</span>'}
 cf.addEventListener('submit',function(e){e.preventDefault();cf.querySelectorAll('.bad').forEach(function(x){x.classList.remove('bad')});$('cartError').classList.remove('on');var ok=true;
  function bad(n){cf.querySelector('[data-field="'+n+'"]').classList.add('bad');ok=false}
  if(!cart.length){ok=false;$('cartList').scrollIntoView({behavior:'smooth',block:'center'});$('cartList').firstChild.style.color='#B0503A'}
  if(!$('cName').value.trim())bad('cName');if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('cEmail').value))bad('cEmail');if(!$('cPhone').value.trim())bad('cPhone');
  if(!ok){var b=cf.querySelector('.bad');if(b)b.scrollIntoView({behavior:'smooth',block:'center'});return}
  $('orderField').value=plain();$('orderEst').value=tot()?'$'+tot():'Price on request';
  var d=new FormData(cf);d.set('_subject','New Collection Request - The Mane Experience');
  var sum='NEW COLLECTION REQUEST\n\nName: '+d.get('name')+'\nEmail: '+d.get('email')+'\nPhone: '+d.get('phone')+'\n'+d.get('fulfillment')+'\n\nITEMS\n'+plain()+'\n\nEstimated total: '+$('orderEst').value+'\nNotes: '+(d.get('notes')||'-');
  var btn=cf.querySelector('button[type=submit]');btn.disabled=true;btn.textContent='Sending...';
  fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(d).toString()}).catch(function(){});
  fetch('https://formspree.io/f/myeyplre',{method:'POST',body:d,headers:{Accept:'application/json'}}).then(function(r){if(!r.ok)throw 0;cf.hidden=true;$('cartSummary').textContent=sum;$('cartDone').hidden=false;$('cartDone').scrollIntoView({behavior:'smooth'})})
  .catch(function(){btn.disabled=false;btn.textContent='Send Request';$('cartError').classList.add('on')})})}
/* booking */
var f=$('bookingForm');if(!f)return;
var EMAIL='themaneexperienceco@gmail.com',FS='https://formspree.io/f/myeyplre';
var svc=$('service'),soon=$('soonNote'),wig=$('wigSet'),hairBlock=$('hairBlock'),laceBlock=$('laceBlock'),measureBlock=$('measureBlock');
var estPlain='';
function setOn(el,on){el.hidden=!on;el.querySelectorAll('input,select,textarea').forEach(function(c){c.disabled=!on})}
function has(a){var o=svc.selectedOptions[0];return !!(o&&o.hasAttribute(a))}
function money(n){return '$'+n}
function est(){
 var box=$('estimate');if(!svc.value){box.classList.remove('on');estPlain='';return}
 var rows=[],plain=[],total=0,notes=[];
 if(!hairBlock.hidden&&$('hairType').value&&$('hairLength').value){
  var g=$('hairType').selectedOptions[0].getAttribute('data-grade'),len=$('hairLength').value,p=PRICES[g]&&PRICES[g][len],n=parseInt($('bundles').value||'0',10);
  if(p&&n){var t=p*n;total+=t;var lbl=n+' bundle'+(n>1?'s':'')+' × '+len+'" '+$('hairType').value.split(':')[0]+' @ '+money(p);rows.push([lbl,money(t)]);plain.push(lbl+' = '+money(t));
   var tx=$('texture').value;if(!/straight|body/i.test(tx))notes.push('Texture-specific pricing may vary.')}
  else if(n){notes.push('Hair pricing for this selection is confirmed when your request is reviewed.');plain.push('Hair pricing to be confirmed')}
 }else if(!wig.hidden&&hairBlock.hidden){plain.push('Client providing own hair/wig')}
 if($('sameDay').checked){total+=50;rows.push(['Same-day / squeeze-in fee',money(50)]);plain.push('Same-day fee $50')}
 if($('travel').checked){rows.push(['Travel fee','from $25']);plain.push('Travel fee from $25')}
 if(total>0)rows.push(['Estimated total (hair &amp; fees)',money(total)+($('travel').checked?' + travel':'')]);
 if(total>0)plain.push('Estimated total '+money(total));
 $('estRows').innerHTML=rows.map(function(r,i){return '<div class="er'+(i===rows.length-1&&total>0?' t':'')+'"><span>'+r[0]+'</span><span>'+r[1]+'</span></div>'}).join('');
 notes.push('Install and styling fees are confirmed when your request is reviewed. This is an estimate, not a final quote. A $20 deposit secures your appointment and goes toward your total.');
 $('estNotes').textContent=notes.join(' ');estPlain=plain.join('; ')||'Pricing confirmed at review';box.classList.add('on');
}
function sync(){
 soon.classList.toggle('on',has('data-soon'));
 var hair=has('data-hair');wig.hidden=!hair;
 wig.querySelector('.srcw').querySelectorAll('select').forEach(function(c){c.disabled=!hair});
 var own=$('hairSource').value.indexOf('own')>-1;
 setOn(hairBlock,hair&&!own);setOn(laceBlock,hair&&has('data-lace'));setOn(measureBlock,hair&&has('data-measure'));
 est();
}
svc.onchange=sync;
['hairSource','hairType','hairLength','bundles','texture'].forEach(function(i){$(i).addEventListener('change',function(){i==='hairSource'?sync():est()})});
try{var q=new URLSearchParams(location.search).get('service');if(q){for(var i=0;i<svc.options.length;i++){if(svc.options[i].value.replace(/&/g,'and')===q||svc.options[i].value===q){svc.selectedIndex=i;break}}}}catch(e){}
sync();
var today=new Date().toISOString().split('T')[0];$('preferredDate').min=today;$('backupDate').min=today;
$('sameDay').onchange=function(){$('sameDayNote').classList.toggle('on',this.checked);est()};
$('travel').onchange=function(){$('travelNote').classList.toggle('on',this.checked);est()};
function fd(v){if(!v)return'-';var p=v.split('-');return p[1]+'/'+p[2]+'/'+p[0]}
function ft(v){if(!v)return'-';var p=v.split(':').map(Number),h=p[0];return((h+11)%12+1)+':'+String(p[1]).padStart(2,'0')+(h>=12?' PM':' AM')}
f.addEventListener('submit',function(e){e.preventDefault();
 f.querySelectorAll('.bad').forEach(function(x){x.classList.remove('bad')});$('hairPrepError').classList.remove('on');$('policyError').classList.remove('on');$('submitError').classList.remove('on');
 var data=new FormData(f);data.set('_subject','New Booking Request - The Mane Experience');var ok=true;
 function bad(n){var el=f.querySelector('[data-field="'+n+'"]');if(el)el.classList.add('bad')}
 var req=['firstName','lastName','email','phone','service','preferredDate','preferredTime','location','hairType','hairLength','bundles','laceType'];
 req.forEach(function(n){var c=f.elements[n];if(c&&c.disabled)return;var v=data.get(n);if(!v||!String(v).trim()){ok=false;bad(n)}});
 var em=data.get('email');if(em&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){ok=false;bad('email')}
 if(!$('hairPrep').checked){ok=false;$('hairPrepError').classList.add('on')}
 var pok=true;['policyDeposit','policyLate','policySameDay','policyRequest'].forEach(function(n){if(!$(n).checked)pok=false});
 if(!pok){ok=false;$('policyError').classList.add('on')}
 if(!ok){var b=f.querySelector('.bad,.err.on');if(b)b.scrollIntoView({behavior:'smooth',block:'center'});return}
 est();data.set('estimate',estPlain);
 var L=['NEW BOOKING REQUEST - THE MANE EXPERIENCE','','CONTACT','Name: '+data.get('firstName')+' '+data.get('lastName'),'Email: '+data.get('email'),'Phone: '+data.get('phone'),'Instagram: '+(data.get('instagram')||'-'),'',
 'SERVICE & SCHEDULING','Service: '+data.get('service'),'Preferred: '+fd(data.get('preferredDate'))+' at '+ft(data.get('preferredTime')),'Backup: '+fd(data.get('backupDate'))+' at '+ft(data.get('backupTime')),'Same-day / squeeze-in: '+($('sameDay').checked?'Yes':'No'),''];
 if(!wig.hidden){L.push('HAIR & WIG DETAILS','Hair source: '+data.get('hairSource'));
  if(!hairBlock.hidden)L.push('Hair type: '+data.get('hairType'),'Texture: '+data.get('texture'),'Length: '+data.get('hairLength')+'"','Bundles: '+data.get('bundles'),'Color: '+(data.get('color')||'-'));
  if(!laceBlock.hidden)L.push('Lace type: '+data.get('laceType'),'Lace piece: '+data.get('laceSize'));
  if(!measureBlock.hidden)L.push('Measurements (in): circumference '+(data.get('measureCircumference')||'-')+', ear-to-ear '+(data.get('measureEarToEar')||'-')+', front-to-nape '+(data.get('measureFrontToNape')||'-')+', temple-to-temple '+(data.get('measureTempleToTemple')||'-')+', nape width '+(data.get('measureNapeWidth')||'-'),'Density: '+data.get('density'));
  L.push('')}
 L.push('ESTIMATE',estPlain,'','LOCATION','Location: '+data.get('location'),'Travel requested: '+($('travel').checked?'Yes (from $25+)':'No'),'','Hair prep confirmed: Yes','','NOTES',(data.get('notes')&&data.get('notes').trim()?data.get('notes'):'-'),'','Policies acknowledged: deposit, late fees, same-day fee, request not confirmed');
 L=L.join('\n');
 $('confirmationSummary').textContent=L;
 $('emailLink').href='mailto:'+EMAIL+'?subject='+encodeURIComponent('New Booking Request - The Mane Experience')+'&body='+encodeURIComponent(L);
 var btn=f.querySelector('button[type=submit]');btn.disabled=true;btn.textContent='Sending...';
 fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(data).toString()}).catch(function(){});
 fetch(FS,{method:'POST',body:data,headers:{Accept:'application/json'}}).then(function(r){if(!r.ok)throw 0;f.hidden=true;$('confirmation').hidden=false;$('confirmation').scrollIntoView({behavior:'smooth'})})
 .catch(function(){btn.disabled=false;btn.textContent='Submit Booking Request';$('submitError').classList.add('on');$('submitError').scrollIntoView({behavior:'smooth',block:'center'})});
});
})();
