
(function(){
var $=function(i){return document.getElementById(i)};
$('yr').textContent=new Date().getFullYear();
var nav=$('nav');function sc(){nav.classList.toggle('sc',scrollY>40)}addEventListener('scroll',sc,{passive:true});sc();
var d=$('drawer'),s=$('scrim');function op(){d.classList.add('on');s.classList.add('on')}function cl(){d.classList.remove('on');s.classList.remove('on')}
$('burger').onclick=op;$('dx').onclick=cl;s.onclick=cl;d.querySelectorAll('a').forEach(function(a){a.onclick=cl});
var els=document.querySelectorAll('.rv,.strand');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});els.forEach(function(e){io.observe(e)})}else{els.forEach(function(e){e.classList.add('in')})}
/* gallery: auto-loads images/gallery/look-1..24 (.jpg/.jpeg/.png/.webp) if present */
var gal=$('gal');if(gal){var G=["img_6701.jpg", "img_6703.jpg", "img_6704.jpg", "img_6708.jpg", "img_6709.jpg", "img_6710.jpg", "img_6711.jpg", "img_6712.jpg", "img_6713.jpg", "img_6714.jpg", "img_6715.jpg", "img_6716.jpg", "img_6717.jpg", "img_6718.jpg", "img_6720.jpg", "img_6721.jpg", "img_6722.jpg", "img_6723.jpg", "img_6724.jpg", "img_6725.jpg", "img_6726.jpg", "img_6727.jpg", "img_6730.jpg", "img_6731.jpg"];G.forEach(function(fn){var a=document.createElement('a');a.href='images/gallery/'+fn;a.target='_blank';var i=new Image();i.alt='Wig install and quick weave by The Mane Experience in Monroe, GA';i.loading='lazy';i.onerror=function(){a.remove()};a.appendChild(i);gal.appendChild(a);i.src='images/gallery/'+fn});setTimeout(function(){if(!gal.children.length)$('galEmpty').hidden=false},2500)}
var PRICES={"12A": {"10": 80, "12": 90, "14": 115, "16": 145, "18": 170, "20": 185, "22": 210, "24": 230, "26": 250, "28": 265, "30": 290}, "13A": {"18": 180, "20": 215, "22": 255, "24": 275, "26": 295, "28": 315}};var LACE={};
document.addEventListener('input',function(e){var w=e.target.closest&&e.target.closest('.f.bad');if(w)w.classList.remove('bad')});document.addEventListener('change',function(e){var w=e.target.closest&&e.target.closest('.f.bad');if(w)w.classList.remove('bad')});
/* collection cart */
var cf=$('cartForm');if(cf){var cart=[];
 function price(card){if(card.dataset.rm)return card.dataset.price?+card.dataset.price:null;var g=card.dataset.g,l=card.querySelector('.pl').value;return PRICES[g]&&PRICES[g][l]?PRICES[g][l]:null}
 document.querySelectorAll('.prod').forEach(function(card){var pp=card.querySelector('.pp');
  function upd(){if(card.dataset.rm)return;var p=price(card);pp.textContent=p?'$'+p+' per bundle':'Price confirmed on request'}
  if(!card.dataset.rm){card.querySelector('.pl').onchange=upd;upd()}
  card.querySelector('.add').onclick=function(){var p=price(card),it;
   if(card.dataset.rm){it={label:card.dataset.name,qty:1,unit:p}}else{var q=+card.querySelector('.pq').value,l=card.querySelector('.pl').value;it={label:card.dataset.name+' · '+card.querySelector('.pt').value+' '+l+'"',qty:q,unit:p}}
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
/* apple-style choice tiles */
function tileify(sel){if(!sel||sel._t)return;var box=document.createElement('div');box.className='tiles';box.setAttribute('role','radiogroup');sel._t=box;sel.style.display='none';sel.setAttribute('aria-hidden','true');sel.tabIndex=-1;sel.parentNode.insertBefore(box,sel.nextSibling);
 function render(){var opts=[].slice.call(sel.options).filter(function(o){return o.value!==''});var long=opts.some(function(o){return o.text.length>16});
  box.className='tiles'+(long?' cards':' pills')+(sel.disabled?' off':'');box.innerHTML='';
  opts.forEach(function(o){var b=document.createElement('button');b.type='button';b.setAttribute('role','radio');var on=o.selected&&sel.value===o.value;b.setAttribute('aria-checked',on?'true':'false');if(on)b.className='on';
   var t=o.text,i=t.indexOf(': ');if(long&&i>0){b.innerHTML='<span class="t1"></span><span class="t2"></span>';b.firstChild.textContent=t.slice(0,i);b.lastChild.textContent=t.slice(i+2)}else b.textContent=t;
   b.onclick=function(){if(sel.disabled)return;sel.value=o.value;sel.dispatchEvent(new Event('change',{bubbles:true}));render()};box.appendChild(b)})}
 new MutationObserver(render).observe(sel,{childList:true,attributes:true,attributeFilter:['disabled']});sel.addEventListener('change',render);render()}
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
 var htot=0,tme=$('hairSource').value.indexOf('provide')>-1;
 if(isCustom()){
  var cn=parseInt($('bundles').value||'0',10),lens=bundleLens(),cg=$('hairType').selectedOptions[0]?$('hairType').selectedOptions[0].getAttribute('data-grade'):'',cname=$('hairType').value;
  if(cn&&cg&&lens.length===cn){var cnt={},miss=false;
   lens.forEach(function(l){var p=PRICES[cg]&&PRICES[cg][l];if(p){htot+=p;cnt[l]=(cnt[l]||0)+1}else miss=true});
   Object.keys(cnt).sort(function(a,b){return a-b}).forEach(function(l){var u=PRICES[cg][l];rows.push([cnt[l]+' × '+l+'" '+cname+' @ '+money(u),money(u*cnt[l])]);plain.push(cnt[l]+' × '+l+'" '+cname+' @ '+money(u)+' = '+money(u*cnt[l]))});
   if(miss){notes.push('Pricing for some lengths is confirmed when your request is reviewed.');plain.push('Some hair pricing to be confirmed')}
  }else if(cn){notes.push('Choose a hair type and a length for each bundle to see your estimate.')}
  var dens=cn===4?(cg==='RC'?'300%':'200%'):'';
  $('density').value=dens||'Confirmed by Bri';
  if(dens){rows.push(['Wig density ('+cn+' bundles)',dens]);plain.push('Density '+dens)}
  if(cn===4&&cg&&cg!=='RC')notes.push('4 bundles gives 200% density. Only Raw Cambodian Double Drawn can reach 300%.');
  var tx0=$('texture').value;if(tx0&&!/straight|body/i.test(tx0))notes.push('Textured styles may be priced differently; Bri confirms with your request.');
 }else if(!hairBlock.hidden&&$('hairType').value&&$('hairLength').value){
  var g=$('hairType').selectedOptions[0].getAttribute('data-grade'),len=$('hairLength').value,p=PRICES[g]&&PRICES[g][len],n=parseInt($('bundles').value||'0',10);
  if(p&&n){htot=p*n;var lbl=n+' bundle'+(n>1?'s':'')+' × '+len+'" '+$('hairType').value.split(':')[0]+' @ '+money(p);rows.push([lbl,money(htot)]);plain.push(lbl+' = '+money(htot));
   var tx=$('texture').value;if(tx&&!/straight|body/i.test(tx))notes.push('Textured styles may be priced differently; Bri confirms with your request.')}
  else if(n){notes.push('Hair pricing for this selection is confirmed when your request is reviewed.');plain.push('Hair pricing to be confirmed')}
 }
 if(!laceBlock.hidden&&$('laceType').value){var lk=$('laceType').value+'|'+$('laceSize').value,lp=LACE[lk];
  if(lp){total+=lp;rows.push([$('laceType').value+' '+$('laceSize').value,money(lp)]);plain.push($('laceType').value+' '+$('laceSize').value+' = '+money(lp))}
  else{notes.push('Your '+$('laceSize').value+' '+$('laceType').value+' price is confirmed when your request is reviewed.');plain.push('Lace piece '+$('laceType').value+' '+$('laceSize').value+': price to be confirmed')}}
 if(htot>0){total+=htot;if(tme){var dsc=Math.round(htot*0.1);total-=dsc;rows.push(['TME hair discount (10%)','−'+money(dsc)]);plain.push('TME hair discount 10% = -'+money(dsc))}}
 if(!wig.hidden&&hairBlock.hidden){plain.push('Client providing own hair/wig')}
 if(!measureBlock.hidden&&$('consultType').value.indexOf('Stylist')>-1){total+=25;rows.push(['Consultation travel (stylist drives)',money(25)]);plain.push('Consultation travel fee $25 flat')}
 if($('sameDay').checked){total+=50;rows.push(['Same-day / squeeze-in fee',money(50)]);plain.push('Same-day fee $50')}
 if($('travel').checked){rows.push(['Travel fee','from $25']);plain.push('Travel fee from $25')}
 if(total>0)rows.push(['Estimated total (hair &amp; fees)',money(total)+($('travel').checked?' + travel':'')]);
 if(total>0)plain.push('Estimated total '+money(total));
 $('estRows').innerHTML=rows.map(function(r,i){return '<div class="er'+(i===rows.length-1&&total>0?' t':'')+'"><span>'+r[0]+'</span><span>'+r[1]+'</span></div>'}).join('');
 notes.push('Install and styling fees are confirmed when your request is reviewed. This is an estimate, not a final quote. A $20 non-refundable deposit secures your appointment and goes toward your total.');
 var pe=$('progEst');if(pe)pe.textContent=total>0?'Estimate: '+money(total):'';
 $('estNotes').textContent=notes.join(' ');estPlain=plain.join('; ')||'Pricing confirmed at review';box.classList.add('on');
}
function sync(){
 soon.classList.toggle('on',has('data-soon'));
 var hair=has('data-hair');wig.hidden=!hair;
 wig.querySelector('.srcw').querySelectorAll('select').forEach(function(c){c.disabled=!hair});
 var own=$('hairSource').value.indexOf('own')>-1;
 setOn(hairBlock,hair&&!own);setOn(laceBlock,hair&&has('data-lace'));setOn(measureBlock,hair&&has('data-measure'));
 custSync();texSync();est();
}
svc.onchange=sync;
var hlWrap=$('hlWrap'),bundleBox=$('bundleTypes'),BUNHTML=$('bundles').innerHTML,LENOPTS=$('hairLength').innerHTML;
function isCustom(){return has('data-measure')&&!hairBlock.hidden}
function bundleLens(){var o=[];bundleBox.querySelectorAll('select').forEach(function(s){if(!s.disabled&&s.value)o.push(s.value)});return o}
function custSync(){var c=isCustom();hlWrap.hidden=c;$('hairLength').disabled=c||hairBlock.hidden;
 var b=$('bundles'),prev=b.value;
 if(c){b.innerHTML='<option value="" disabled>How many bundles?</option><option>3</option><option>4</option>';b.value=(prev==='3'||prev==='4')?prev:'';if(!b.value)b.selectedIndex=0}
 else if(b.options.length<4){b.innerHTML=BUNHTML;b.value=''}
 bundleBox.hidden=!c;
 if(!c){bundleBox.querySelectorAll('select').forEach(function(s){s.disabled=true});return}
 var n=parseInt(b.value||'0',10),old=[];bundleBox.querySelectorAll('select').forEach(function(s){old.push(s.value)});
 bundleBox.innerHTML='';
 for(var i=1;i<=n;i++){var d=document.createElement('div');d.className='f';d.setAttribute('data-field','bundleLength'+i);
  d.innerHTML='<label for="bl'+i+'">Bundle '+i+' length</label><select id="bl'+i+'" name="bundleLength'+i+'" required><option value="" disabled selected>Choose length&hellip;</option>'+LENOPTS.replace(/<option value="" disabled selected>[^<]*<\/option>/,'')+'</select><span class="err">Please choose a length for bundle '+i+'.</span>';
  bundleBox.appendChild(d);var s=d.querySelector('select');if(old[i-1]){s.value=old[i-1]}else{s.selectedIndex=0}
  s.addEventListener('change',est);tileify(s)}
}
function texSync(){var t=$('texture'),prev=t.value,o=$('hairType').selectedOptions[0],list=o&&o.getAttribute('data-tex')?o.getAttribute('data-tex').split(','):[];
 t.innerHTML=list.length?list.map(function(x){return '<option>'+x+'</option>'}).join(''):'<option value="">Choose a hair type first</option>';
 if(list.indexOf(prev)>-1)t.value=prev;
 $('texHint').textContent=isCustom()?'(one texture for the whole wig)':'';
 var m=$('texMatch');if(m)m.textContent=t.value?'Your frontal or closure must match your bundles, so it will be '+t.value+'.':'Your frontal or closure texture will match your bundle texture.'}
$('hairType').addEventListener('change',function(){texSync()});$('bundles').addEventListener('change',function(){custSync();texSync()});texSync();
['hairSource','hairType','hairLength','bundles','texture','consultType','laceType','laceSize'].forEach(function(i){$(i).addEventListener('change',function(){i==='hairSource'?sync():est()})});
try{var q=new URLSearchParams(location.search).get('service');if(q){for(var i=0;i<svc.options.length;i++){if(svc.options[i].value.replace(/&/g,'and')===q||svc.options[i].value===q){svc.selectedIndex=i;break}}}}catch(e){}
sync();
['service','hairSource','hairType','texture','bundles','hairLength','laceType','laceSize','consultType'].forEach(function(i){tileify($(i))});
function ymd(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function setMin(){var d=new Date();if(!$('sameDay').checked)d.setDate(d.getDate()+2);var m=ymd(d);$('preferredDate').min=m;$('backupDate').min=m}
setMin();
/* progress */
function prog(){var els=f.querySelectorAll('[required]'),tot=0,done=0;els.forEach(function(c){if(c.disabled||c.closest('[hidden]'))return;tot++;if(c.type==='checkbox'?c.checked:(c.value&&c.value.trim()))done++});
 var pc=tot?Math.round(done/tot*100):0;$('progBar').style.width=pc+'%';$('progTxt').textContent=pc>=100?'All set. Ready to send!':(pc?pc+'% complete':'Takes about 3 minutes')}
f.addEventListener('input',prog);f.addEventListener('change',prog);setTimeout(prog,50);
$('sameDay').onchange=function(){$('sameDayNote').classList.toggle('on',this.checked);setMin();est()};
$('travel').onchange=function(){$('travelNote').classList.toggle('on',this.checked);est()};
function fd(v){if(!v)return'-';var p=v.split('-');return p[1]+'/'+p[2]+'/'+p[0]}
function ft(v){if(!v)return'-';var p=v.split(':').map(Number),h=p[0];return((h+11)%12+1)+':'+String(p[1]).padStart(2,'0')+(h>=12?' PM':' AM')}
f.addEventListener('submit',function(e){e.preventDefault();
 f.querySelectorAll('.bad').forEach(function(x){x.classList.remove('bad')});$('hairPrepError').classList.remove('on');$('policyError').classList.remove('on');$('submitError').classList.remove('on');
 var data=new FormData(f);data.set('_subject','New Booking Request - The Mane Experience');var ok=true;
 function bad(n){var el=f.querySelector('[data-field="'+n+'"]');if(el)el.classList.add('bad')}
 var req=['firstName','lastName','email','phone','service','preferredDate','preferredTime','location','hairType','hairLength','bundles','laceType','consultType'].concat(Array.prototype.map.call(bundleBox.querySelectorAll('select'),function(x){return x.name}));
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
  if(isCustom()){var bl=bundleLens();L.push('Hair type: '+data.get('hairType'),'Bundles: '+bl.length+' (lengths: '+bl.map(function(x,i){return (i+1)+'='+x+'"'}).join(', ')+')','Texture (one for whole wig): '+data.get('texture'),'Density: '+$('density').value,'Color: '+(data.get('color')||'-'))}
  else if(!hairBlock.hidden)L.push('Hair type: '+data.get('hairType'),'Texture: '+data.get('texture'),'Length: '+data.get('hairLength')+'"','Bundles: '+data.get('bundles'),'Color: '+(data.get('color')||'-'));
  if(!laceBlock.hidden)L.push('Lace type: '+data.get('laceType'),'Lace piece: '+data.get('laceSize')+(data.get('texture')?' ('+data.get('texture')+', matched to bundles)':''));
  if(!measureBlock.hidden)L.push('Consultation: '+data.get('consultType'),'Measurements (in): circumference '+(data.get('measureCircumference')||'-')+', ear-to-ear '+(data.get('measureEarToEar')||'-')+', front-to-nape '+(data.get('measureFrontToNape')||'-')+', temple-to-temple '+(data.get('measureTempleToTemple')||'-')+', nape width '+(data.get('measureNapeWidth')||'-'),'');
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
