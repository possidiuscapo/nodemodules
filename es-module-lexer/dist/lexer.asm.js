/* es-module-lexer 1.3.0 */
let e,a,r,i=2<<19;const s=1===new Uint8Array(new Uint16Array([1]).buffer)[0]?function(e,a){const r=e.length;let i=0;for(;i<r;)a[i]=e.charCodeAt(i++)}:function(e,a){const r=e.length;let i=0;for(;i<r;){const r=e.charCodeAt(i);a[i++]=(255&r)<<8|r>>>8}},t="xportmportlassetaromsyncunctionssertvoyiedelecontininstantybreareturdebuggeawaithrwhileforifcatcfinallels";let f,c,n;export function parse(l,k="@"){f=l,c=k;const u=2*f.length+(2<<18);if(u>i||!e){for(;u>i;)i*=2;a=new ArrayBuffer(i),s(t,new Uint16Array(a,16,105)),e=function(e,a,r){"use asm";var i=new e.Int8Array(r),s=new e.Int16Array(r),t=new e.Int32Array(r),f=new e.Uint8Array(r),c=new e.Uint16Array(r),n=1024;function b(){var e=0,a=0,r=0,f=0,b=0,u=0,w=0;w=n;n=n+10240|0;i[795]=1;s[395]=0;s[396]=0;t[67]=t[2];i[796]=0;t[66]=0;i[794]=0;t[68]=w+2048;t[69]=w;i[797]=0;e=(t[3]|0)+-2|0;t[70]=e;a=e+(t[64]<<1)|0;t[71]=a;e:while(1){r=e+2|0;t[70]=r;if(e>>>0>=a>>>0){b=18;break}a:do{switch(s[r>>1]|0){case 9:case 10:case 11:case 12:case 13:case 32:break;case 101:{if((((s[396]|0)==0?H(r)|0:0)?(m(e+4|0,16,10)|0)==0:0)?(l(),(i[795]|0)==0):0){b=9;break e}else b=17;break}case 105:{if(H(r)|0?(m(e+4|0,26,10)|0)==0:0){k();b=17}else b=17;break}case 59:{b=17;break}case 47:switch(s[e+4>>1]|0){case 47:{P();break a}case 42:{y(1);break a}default:{b=16;break e}}default:{b=16;break e}}}while(0);if((b|0)==17){b=0;t[67]=t[70]}e=t[70]|0;a=t[71]|0}if((b|0)==9){e=t[70]|0;t[67]=e;b=19}else if((b|0)==16){i[795]=0;t[70]=e;b=19}else if((b|0)==18)if(!(i[794]|0)){e=r;b=19}else e=0;do{if((b|0)==19){e:while(1){a=e+2|0;t[70]=a;f=a;if(e>>>0>=(t[71]|0)>>>0){b=82;break}a:do{switch(s[a>>1]|0){case 9:case 10:case 11:case 12:case 13:case 32:break;case 101:{if(((s[396]|0)==0?H(a)|0:0)?(m(e+4|0,16,10)|0)==0:0){l();b=81}else b=81;break}case 105:{if(H(a)|0?(m(e+4|0,26,10)|0)==0:0){k();b=81}else b=81;break}case 99:{if((H(a)|0?(m(e+4|0,36,8)|0)==0:0)?V(s[e+12>>1]|0)|0:0){i[797]=1;b=81}else b=81;break}case 40:{f=t[68]|0;a=s[396]|0;b=a&65535;t[f+(b<<3)>>2]=1;r=t[67]|0;s[396]=a+1<<16>>16;t[f+(b<<3)+4>>2]=r;b=81;break}case 41:{a=s[396]|0;if(!(a<<16>>16)){b=36;break e}a=a+-1<<16>>16;s[396]=a;r=s[395]|0;if(r<<16>>16!=0?(u=t[(t[69]|0)+((r&65535)+-1<<2)>>2]|0,(t[u+20>>2]|0)==(t[(t[68]|0)+((a&65535)<<3)+4>>2]|0)):0){a=u+4|0;if(!(t[a>>2]|0))t[a>>2]=f;t[u+12>>2]=e+4;s[395]=r+-1<<16>>16;b=81}else b=81;break}case 123:{b=t[67]|0;f=t[61]|0;e=b;do{if((s[b>>1]|0)==41&(f|0)!=0?(t[f+4>>2]|0)==(b|0):0){a=t[62]|0;t[61]=a;if(!a){t[57]=0;break}else{t[a+28>>2]=0;break}}}while(0);f=t[68]|0;r=s[396]|0;b=r&65535;t[f+(b<<3)>>2]=(i[797]|0)==0?2:6;s[396]=r+1<<16>>16;t[f+(b<<3)+4>>2]=e;i[797]=0;b=81;break}case 125:{e=s[396]|0;if(!(e<<16>>16)){b=49;break e}f=t[68]|0;b=e+-1<<16>>16;s[396]=b;if((t[f+((b&65535)<<3)>>2]|0)==4){h();b=81}else b=81;break}case 39:{d(39);b=81;break}case 34:{d(34);b=81;break}case 47:switch(s[e+4>>1]|0){case 47:{P();break a}case 42:{y(1);break a}default:{e=t[67]|0;f=s[e>>1]|0;r:do{if(!(U(f)|0)){switch(f<<16>>16){case 41:if(D(t[(t[68]|0)+(c[396]<<3)+4>>2]|0)|0){b=69;break r}else{b=66;break r}case 125:break;default:{b=66;break r}}a=t[68]|0;r=c[396]|0;if(!(p(t[a+(r<<3)+4>>2]|0)|0)?(t[a+(r<<3)>>2]|0)!=6:0)b=66;else b=69}else switch(f<<16>>16){case 46:if(((s[e+-2>>1]|0)+-48&65535)<10){b=66;break r}else{b=69;break r}case 43:if((s[e+-2>>1]|0)==43){b=66;break r}else{b=69;break r}case 45:if((s[e+-2>>1]|0)==45){b=66;break r}else{b=69;break r}default:{b=69;break r}}}while(0);r:do{if((b|0)==66){b=0;if(!(o(e)|0)){switch(f<<16>>16){case 0:{b=69;break r}case 47:{if(i[796]|0){b=69;break r}break}default:{}}r=t[3]|0;a=f;do{if(e>>>0<=r>>>0)break;e=e+-2|0;t[67]=e;a=s[e>>1]|0}while(!(E(a)|0));if(F(a)|0){do{if(e>>>0<=r>>>0)break;e=e+-2|0;t[67]=e}while(F(s[e>>1]|0)|0);if(j(e)|0){g();i[796]=0;b=81;break a}else e=1}else e=1}else b=69}}while(0);if((b|0)==69){g();e=0}i[796]=e;b=81;break a}}case 96:{f=t[68]|0;r=s[396]|0;b=r&65535;t[f+(b<<3)+4>>2]=t[67];s[396]=r+1<<16>>16;t[f+(b<<3)>>2]=3;h();b=81;break}default:b=81}}while(0);if((b|0)==81){b=0;t[67]=t[70]}e=t[70]|0}if((b|0)==36){T();e=0;break}else if((b|0)==49){T();e=0;break}else if((b|0)==82){e=(i[794]|0)==0?(s[395]|s[396])<<16>>16==0:0;break}}}while(0);n=w;return e|0}function l(){var e=0,a=0,r=0,f=0,c=0,n=0,b=0,l=0,k=0,o=0,h=0,A=0,C=0,g=0;l=t[70]|0;k=t[63]|0;g=l+12|0;t[70]=g;r=w(1)|0;e=t[70]|0;if(!((e|0)==(g|0)?!(I(r)|0):0))C=3;e:do{if((C|0)==3){a:do{switch(r<<16>>16){case 123:{t[70]=e+2;e=w(1)|0;r=t[70]|0;while(1){if(W(e)|0){d(e);e=(t[70]|0)+2|0;t[70]=e}else{q(e)|0;e=t[70]|0}w(1)|0;e=v(r,e)|0;if(e<<16>>16==44){t[70]=(t[70]|0)+2;e=w(1)|0}a=r;r=t[70]|0;if(e<<16>>16==125){C=15;break}if((r|0)==(a|0)){C=12;break}if(r>>>0>(t[71]|0)>>>0){C=14;break}}if((C|0)==12){T();break e}else if((C|0)==14){T();break e}else if((C|0)==15){t[70]=r+2;break a}break}case 42:{t[70]=e+2;w(1)|0;g=t[70]|0;v(g,g)|0;break}default:{i[795]=0;switch(r<<16>>16){case 100:{l=e+14|0;t[70]=l;switch((w(1)|0)<<16>>16){case 97:{a=t[70]|0;if((m(a+2|0,56,8)|0)==0?(c=a+10|0,F(s[c>>1]|0)|0):0){t[70]=c;w(0)|0;C=22}break}case 102:{C=22;break}case 99:{a=t[70]|0;if(((m(a+2|0,36,8)|0)==0?(f=a+10|0,g=s[f>>1]|0,V(g)|0|g<<16>>16==123):0)?(t[70]=f,n=w(1)|0,n<<16>>16!=123):0){A=n;C=31}break}default:{}}r:do{if((C|0)==22?(b=t[70]|0,(m(b+2|0,64,14)|0)==0):0){r=b+16|0;a=s[r>>1]|0;if(!(V(a)|0))switch(a<<16>>16){case 40:case 42:break;default:break r}t[70]=r;a=w(1)|0;if(a<<16>>16==42){t[70]=(t[70]|0)+2;a=w(1)|0}if(a<<16>>16!=40){A=a;C=31}}}while(0);if((C|0)==31?(o=t[70]|0,q(A)|0,h=t[70]|0,h>>>0>o>>>0):0){$(e,l,o,h);t[70]=(t[70]|0)+-2;break e}$(e,l,0,0);t[70]=e+12;break e}case 97:{t[70]=e+10;w(0)|0;e=t[70]|0;C=35;break}case 102:{C=35;break}case 99:{if((m(e+2|0,36,8)|0)==0?(a=e+10|0,E(s[a>>1]|0)|0):0){t[70]=a;g=w(1)|0;C=t[70]|0;q(g)|0;g=t[70]|0;$(C,g,C,g);t[70]=(t[70]|0)+-2;break e}e=e+4|0;t[70]=e;break}case 108:case 118:break;default:break e}if((C|0)==35){t[70]=e+16;e=w(1)|0;if(e<<16>>16==42){t[70]=(t[70]|0)+2;e=w(1)|0}C=t[70]|0;q(e)|0;g=t[70]|0;$(C,g,C,g);t[70]=(t[70]|0)+-2;break e}t[70]=e+6;i[795]=0;r=w(1)|0;e=t[70]|0;r=(q(r)|0|32)<<16>>16==123;f=t[70]|0;if(r){t[70]=f+2;g=w(1)|0;e=t[70]|0;q(g)|0}r:while(1){a=t[70]|0;if((a|0)==(e|0))break;$(e,a,e,a);a=w(1)|0;if(r)switch(a<<16>>16){case 93:case 125:break e;default:{}}e=t[70]|0;if(a<<16>>16!=44){C=51;break}t[70]=e+2;a=w(1)|0;e=t[70]|0;switch(a<<16>>16){case 91:case 123:{C=51;break r}default:{}}q(a)|0}if((C|0)==51)t[70]=e+-2;if(!r)break e;t[70]=f+-2;break e}}}while(0);g=(w(1)|0)<<16>>16==102;e=t[70]|0;if(g?(m(e+2|0,50,6)|0)==0:0){t[70]=e+8;u(l,w(1)|0);e=(k|0)==0?232:k+16|0;while(1){e=t[e>>2]|0;if(!e)break e;t[e+12>>2]=0;t[e+8>>2]=0;e=e+16|0}}t[70]=e+-2}}while(0);return}function k(){var e=0,a=0,r=0,f=0,c=0,n=0;c=t[70]|0;e=c+12|0;t[70]=e;e:do{switch((w(1)|0)<<16>>16){case 40:{a=t[68]|0;n=s[396]|0;r=n&65535;t[a+(r<<3)>>2]=5;e=t[70]|0;s[396]=n+1<<16>>16;t[a+(r<<3)+4>>2]=e;if((s[t[67]>>1]|0)!=46){t[70]=e+2;n=w(1)|0;A(c,t[70]|0,0,e);a=t[61]|0;r=t[69]|0;c=s[395]|0;s[395]=c+1<<16>>16;t[r+((c&65535)<<2)>>2]=a;switch(n<<16>>16){case 39:{d(39);break}case 34:{d(34);break}default:{t[70]=(t[70]|0)+-2;break e}}e=(t[70]|0)+2|0;t[70]=e;switch((w(1)|0)<<16>>16){case 44:{t[70]=(t[70]|0)+2;w(1)|0;c=t[61]|0;t[c+4>>2]=e;n=t[70]|0;t[c+16>>2]=n;i[c+24>>0]=1;t[70]=n+-2;break e}case 41:{s[396]=(s[396]|0)+-1<<16>>16;n=t[61]|0;t[n+4>>2]=e;t[n+12>>2]=(t[70]|0)+2;i[n+24>>0]=1;s[395]=(s[395]|0)+-1<<16>>16;break e}default:{t[70]=(t[70]|0)+-2;break e}}}break}case 46:{t[70]=(t[70]|0)+2;if((w(1)|0)<<16>>16==109?(a=t[70]|0,(m(a+2|0,44,6)|0)==0):0){e=t[67]|0;if(!(G(e)|0)?(s[e>>1]|0)==46:0)break e;A(c,c,a+8|0,2)}break}case 42:case 39:case 34:{f=18;break}case 123:{e=t[70]|0;if(s[396]|0){t[70]=e+-2;break e}while(1){if(e>>>0>=(t[71]|0)>>>0)break;e=w(1)|0;if(!(W(e)|0)){if(e<<16>>16==125){f=33;break}}else d(e);e=(t[70]|0)+2|0;t[70]=e}if((f|0)==33)t[70]=(t[70]|0)+2;n=(w(1)|0)<<16>>16==102;e=t[70]|0;if(n?m(e+2|0,50,6)|0:0){T();break e}t[70]=e+8;e=w(1)|0;if(W(e)|0){u(c,e);break e}else{T();break e}}default:if((t[70]|0)==(e|0))t[70]=c+10;else f=18}}while(0);do{if((f|0)==18){if(s[396]|0){t[70]=(t[70]|0)+-2;break}e=t[71]|0;a=t[70]|0;while(1){if(a>>>0>=e>>>0){f=25;break}r=s[a>>1]|0;if(W(r)|0){f=23;break}n=a+2|0;t[70]=n;a=n}if((f|0)==23){u(c,r);break}else if((f|0)==25){T();break}}}while(0);return}function u(e,a){e=e|0;a=a|0;var r=0,i=0;r=(t[70]|0)+2|0;switch(a<<16>>16){case 39:{d(39);i=5;break}case 34:{d(34);i=5;break}default:T()}do{if((i|0)==5){A(e,r,t[70]|0,1);t[70]=(t[70]|0)+2;a=w(0)|0;e=a<<16>>16==97;if(e){r=t[70]|0;if(m(r+2|0,78,10)|0)i=11}else{r=t[70]|0;if(!(((a<<16>>16==119?(s[r+2>>1]|0)==105:0)?(s[r+4>>1]|0)==116:0)?(s[r+6>>1]|0)==104:0))i=11}if((i|0)==11){t[70]=r+-2;break}t[70]=r+((e?6:4)<<1);if((w(1)|0)<<16>>16!=123){t[70]=r;break}e=t[70]|0;a=e;e:while(1){t[70]=a+2;a=w(1)|0;switch(a<<16>>16){case 39:{d(39);t[70]=(t[70]|0)+2;a=w(1)|0;break}case 34:{d(34);t[70]=(t[70]|0)+2;a=w(1)|0;break}default:a=q(a)|0}if(a<<16>>16!=58){i=20;break}t[70]=(t[70]|0)+2;switch((w(1)|0)<<16>>16){case 39:{d(39);break}case 34:{d(34);break}default:{i=24;break e}}t[70]=(t[70]|0)+2;switch((w(1)|0)<<16>>16){case 125:{i=29;break e}case 44:break;default:{i=28;break e}}t[70]=(t[70]|0)+2;if((w(1)|0)<<16>>16==125){i=29;break}a=t[70]|0}if((i|0)==20){t[70]=r;break}else if((i|0)==24){t[70]=r;break}else if((i|0)==28){t[70]=r;break}else if((i|0)==29){i=t[61]|0;t[i+16>>2]=e;t[i+12>>2]=(t[70]|0)+2;break}}}while(0);return}function o(e){e=e|0;e:do{switch(s[e>>1]|0){case 100:switch(s[e+-2>>1]|0){case 105:{e=O(e+-4|0,88,2)|0;break e}case 108:{e=O(e+-4|0,92,3)|0;break e}default:{e=0;break e}}case 101:switch(s[e+-2>>1]|0){case 115:switch(s[e+-4>>1]|0){case 108:{e=B(e+-6|0,101)|0;break e}case 97:{e=B(e+-6|0,99)|0;break e}default:{e=0;break e}}case 116:{e=O(e+-4|0,98,4)|0;break e}case 117:{e=O(e+-4|0,106,6)|0;break e}default:{e=0;break e}}case 102:{if((s[e+-2>>1]|0)==111?(s[e+-4>>1]|0)==101:0)switch(s[e+-6>>1]|0){case 99:{e=O(e+-8|0,118,6)|0;break e}case 112:{e=O(e+-8|0,130,2)|0;break e}default:{e=0;break e}}else e=0;break}case 107:{e=O(e+-2|0,134,4)|0;break}case 110:{e=e+-2|0;if(B(e,105)|0)e=1;else e=O(e,142,5)|0;break}case 111:{e=B(e+-2|0,100)|0;break}case 114:{e=O(e+-2|0,152,7)|0;break}case 116:{e=O(e+-2|0,166,4)|0;break}case 119:switch(s[e+-2>>1]|0){case 101:{e=B(e+-4|0,110)|0;break e}case 111:{e=O(e+-4|0,174,3)|0;break e}default:{e=0;break e}}default:e=0}}while(0);return e|0}function h(){var e=0,a=0,r=0,i=0;a=t[71]|0;r=t[70]|0;e:while(1){e=r+2|0;if(r>>>0>=a>>>0){a=10;break}switch(s[e>>1]|0){case 96:{a=7;break e}case 36:{if((s[r+4>>1]|0)==123){a=6;break e}break}case 92:{e=r+4|0;break}default:{}}r=e}if((a|0)==6){e=r+4|0;t[70]=e;a=t[68]|0;i=s[396]|0;r=i&65535;t[a+(r<<3)>>2]=4;s[396]=i+1<<16>>16;t[a+(r<<3)+4>>2]=e}else if((a|0)==7){t[70]=e;r=t[68]|0;i=(s[396]|0)+-1<<16>>16;s[396]=i;if((t[r+((i&65535)<<3)>>2]|0)!=3)T()}else if((a|0)==10){t[70]=e;T()}return}function w(e){e=e|0;var a=0,r=0,i=0;r=t[70]|0;e:do{a=s[r>>1]|0;a:do{if(a<<16>>16!=47)if(e)if(V(a)|0)break;else break e;else if(F(a)|0)break;else break e;else switch(s[r+2>>1]|0){case 47:{P();break a}case 42:{y(e);break a}default:{a=47;break e}}}while(0);i=t[70]|0;r=i+2|0;t[70]=r}while(i>>>0<(t[71]|0)>>>0);return a|0}function d(e){e=e|0;var a=0,r=0,i=0,f=0;f=t[71]|0;a=t[70]|0;while(1){i=a+2|0;if(a>>>0>=f>>>0){a=9;break}r=s[i>>1]|0;if(r<<16>>16==e<<16>>16){a=10;break}if(r<<16>>16==92){r=a+4|0;if((s[r>>1]|0)==13){a=a+6|0;a=(s[a>>1]|0)==10?a:r}else a=r}else if(Z(r)|0){a=9;break}else a=i}if((a|0)==9){t[70]=i;T()}else if((a|0)==10)t[70]=i;return}function v(e,a){e=e|0;a=a|0;var r=0,i=0,f=0,c=0;r=t[70]|0;i=s[r>>1]|0;c=(e|0)==(a|0);f=c?0:e;c=c?0:a;if(i<<16>>16==97){t[70]=r+4;r=w(1)|0;e=t[70]|0;if(W(r)|0){d(r);a=(t[70]|0)+2|0;t[70]=a}else{q(r)|0;a=t[70]|0}i=w(1)|0;r=t[70]|0}if((r|0)!=(e|0))$(e,a,f,c);return i|0}function A(e,a,r,s){e=e|0;a=a|0;r=r|0;s=s|0;var f=0,c=0;f=t[65]|0;t[65]=f+32;c=t[61]|0;t[((c|0)==0?228:c+28|0)>>2]=f;t[62]=c;t[61]=f;t[f+8>>2]=e;if(2==(s|0))e=r;else e=1==(s|0)?r+2|0:0;t[f+12>>2]=e;t[f>>2]=a;t[f+4>>2]=r;t[f+16>>2]=0;t[f+20>>2]=s;i[f+24>>0]=1==(s|0)&1;t[f+28>>2]=0;return}function C(){var e=0,a=0,r=0;r=t[71]|0;a=t[70]|0;e:while(1){e=a+2|0;if(a>>>0>=r>>>0){a=6;break}switch(s[e>>1]|0){case 13:case 10:{a=6;break e}case 93:{a=7;break e}case 92:{e=a+4|0;break}default:{}}a=e}if((a|0)==6){t[70]=e;T();e=0}else if((a|0)==7){t[70]=e;e=93}return e|0}function g(){var e=0,a=0,r=0;e:while(1){e=t[70]|0;a=e+2|0;t[70]=a;if(e>>>0>=(t[71]|0)>>>0){r=7;break}switch(s[a>>1]|0){case 13:case 10:{r=7;break e}case 47:break e;case 91:{C()|0;break}case 92:{t[70]=e+4;break}default:{}}}if((r|0)==7)T();return}function p(e){e=e|0;switch(s[e>>1]|0){case 62:{e=(s[e+-2>>1]|0)==61;break}case 41:case 59:{e=1;break}case 104:{e=O(e+-2|0,200,4)|0;break}case 121:{e=O(e+-2|0,208,6)|0;break}case 101:{e=O(e+-2|0,220,3)|0;break}default:e=0}return e|0}function y(e){e=e|0;var a=0,r=0,i=0,f=0,c=0;f=(t[70]|0)+2|0;t[70]=f;r=t[71]|0;while(1){a=f+2|0;if(f>>>0>=r>>>0)break;i=s[a>>1]|0;if(!e?Z(i)|0:0)break;if(i<<16>>16==42?(s[f+4>>1]|0)==47:0){c=8;break}f=a}if((c|0)==8){t[70]=a;a=f+4|0}t[70]=a;return}function m(e,a,r){e=e|0;a=a|0;r=r|0;var s=0,t=0;e:do{if(!r)e=0;else{while(1){s=i[e>>0]|0;t=i[a>>0]|0;if(s<<24>>24!=t<<24>>24)break;r=r+-1|0;if(!r){e=0;break e}else{e=e+1|0;a=a+1|0}}e=(s&255)-(t&255)|0}}while(0);return e|0}function I(e){e=e|0;e:do{switch(e<<16>>16){case 38:case 37:case 33:{e=1;break}default:if((e&-8)<<16>>16==40|(e+-58&65535)<6)e=1;else{switch(e<<16>>16){case 91:case 93:case 94:{e=1;break e}default:{}}e=(e+-123&65535)<4}}}while(0);return e|0}function U(e){e=e|0;e:do{switch(e<<16>>16){case 38:case 37:case 33:break;default:if(!((e+-58&65535)<6|(e+-40&65535)<7&e<<16>>16!=41)){switch(e<<16>>16){case 91:case 94:break e;default:{}}return e<<16>>16!=125&(e+-123&65535)<4|0}}}while(0);return 1}function x(e){e=e|0;var a=0;a=s[e>>1]|0;e:do{if((a+-9&65535)>=5){switch(a<<16>>16){case 160:case 32:{a=1;break e}default:{}}if(I(a)|0)return a<<16>>16!=46|(G(e)|0)|0;else a=0}else a=1}while(0);return a|0}function S(e){e=e|0;var a=0,r=0,i=0,f=0;r=n;n=n+16|0;i=r;t[i>>2]=0;t[64]=e;a=t[3]|0;f=a+(e<<1)|0;e=f+2|0;s[f>>1]=0;t[i>>2]=e;t[65]=e;t[57]=0;t[61]=0;t[59]=0;t[58]=0;t[63]=0;t[60]=0;n=r;return a|0}function O(e,a,r){e=e|0;a=a|0;r=r|0;var i=0,s=0;i=e+(0-r<<1)|0;s=i+2|0;e=t[3]|0;if(s>>>0>=e>>>0?(m(s,a,r<<1)|0)==0:0)if((s|0)==(e|0))e=1;else e=x(i)|0;else e=0;return e|0}function $(e,a,r,i){e=e|0;a=a|0;r=r|0;i=i|0;var s=0,f=0;s=t[65]|0;t[65]=s+20;f=t[63]|0;t[((f|0)==0?232:f+16|0)>>2]=s;t[63]=s;t[s>>2]=e;t[s+4>>2]=a;t[s+8>>2]=r;t[s+12>>2]=i;t[s+16>>2]=0;return}function j(e){e=e|0;switch(s[e>>1]|0){case 107:{e=O(e+-2|0,134,4)|0;break}case 101:{if((s[e+-2>>1]|0)==117)e=O(e+-4|0,106,6)|0;else e=0;break}default:e=0}return e|0}function B(e,a){e=e|0;a=a|0;var r=0;r=t[3]|0;if(r>>>0<=e>>>0?(s[e>>1]|0)==a<<16>>16:0)if((r|0)==(e|0))r=1;else r=E(s[e+-2>>1]|0)|0;else r=0;return r|0}function E(e){e=e|0;e:do{if((e+-9&65535)<5)e=1;else{switch(e<<16>>16){case 32:case 160:{e=1;break e}default:{}}e=e<<16>>16!=46&(I(e)|0)}}while(0);return e|0}function P(){var e=0,a=0,r=0;e=t[71]|0;r=t[70]|0;e:while(1){a=r+2|0;if(r>>>0>=e>>>0)break;switch(s[a>>1]|0){case 13:case 10:break e;default:r=a}}t[70]=a;return}function q(e){e=e|0;while(1){if(V(e)|0)break;if(I(e)|0)break;e=(t[70]|0)+2|0;t[70]=e;e=s[e>>1]|0;if(!(e<<16>>16)){e=0;break}}return e|0}function z(){var e=0;e=t[(t[59]|0)+20>>2]|0;switch(e|0){case 1:{e=-1;break}case 2:{e=-2;break}default:e=e-(t[3]|0)>>1}return e|0}function D(e){e=e|0;if(!(O(e,180,5)|0)?!(O(e,190,3)|0):0)e=O(e,196,2)|0;else e=1;return e|0}function F(e){e=e|0;switch(e<<16>>16){case 160:case 32:case 12:case 11:case 9:{e=1;break}default:e=0}return e|0}function G(e){e=e|0;if((s[e>>1]|0)==46?(s[e+-2>>1]|0)==46:0)e=(s[e+-4>>1]|0)==46;else e=0;return e|0}function H(e){e=e|0;if((t[3]|0)==(e|0))e=1;else e=x(e+-2|0)|0;return e|0}function J(){var e=0;e=t[(t[60]|0)+12>>2]|0;if(!e)e=-1;else e=e-(t[3]|0)>>1;return e|0}function K(){var e=0;e=t[(t[59]|0)+12>>2]|0;if(!e)e=-1;else e=e-(t[3]|0)>>1;return e|0}function L(){var e=0;e=t[(t[60]|0)+8>>2]|0;if(!e)e=-1;else e=e-(t[3]|0)>>1;return e|0}function M(){var e=0;e=t[(t[59]|0)+16>>2]|0;if(!e)e=-1;else e=e-(t[3]|0)>>1;return e|0}function N(){var e=0;e=t[(t[59]|0)+4>>2]|0;if(!e)e=-1;else e=e-(t[3]|0)>>1;return e|0}function Q(){var e=0;e=t[59]|0;e=t[((e|0)==0?228:e+28|0)>>2]|0;t[59]=e;return(e|0)!=0|0}function R(){var e=0;e=t[60]|0;e=t[((e|0)==0?232:e+16|0)>>2]|0;t[60]=e;return(e|0)!=0|0}function T(){i[794]=1;t[66]=(t[70]|0)-(t[3]|0)>>1;t[70]=(t[71]|0)+2;return}function V(e){e=e|0;return(e|128)<<16>>16==160|(e+-9&65535)<5|0}function W(e){e=e|0;return e<<16>>16==39|e<<16>>16==34|0}function X(){return(t[(t[59]|0)+8>>2]|0)-(t[3]|0)>>1|0}function Y(){return(t[(t[60]|0)+4>>2]|0)-(t[3]|0)>>1|0}function Z(e){e=e|0;return e<<16>>16==13|e<<16>>16==10|0}function _(){return(t[t[59]>>2]|0)-(t[3]|0)>>1|0}function ee(){return(t[t[60]>>2]|0)-(t[3]|0)>>1|0}function ae(){return f[(t[59]|0)+24>>0]|0|0}function re(e){e=e|0;t[3]=e;return}function ie(){return(i[795]|0)!=0|0}function se(){return t[66]|0}function te(e){e=e|0;n=e+992+15&-16;return 992}return{su:te,ai:M,e:se,ee:Y,ele:J,els:L,es:ee,f:ie,id:z,ie:N,ip:ae,is:_,p:b,re:R,ri:Q,sa:S,se:K,ses:re,ss:X}}("undefined"!=typeof self?self:global,{},a),r=e.su(i-(2<<17))}const h=f.length+1;e.ses(r),e.sa(h-1),s(f,new Uint16Array(a,r,h)),e.p()||(n=e.e(),o());const w=[],d=[];for(;e.ri();){const a=e.is(),r=e.ie(),i=e.ai(),s=e.id(),t=e.ss(),c=e.se();let n;e.ip()&&(n=b(-1===s?a:a+1,f.charCodeAt(-1===s?a-1:a))),w.push({n:n,s:a,e:r,ss:t,se:c,d:s,a:i})}for(;e.re();){const a=e.es(),r=e.ee(),i=e.els(),s=e.ele(),t=f.charCodeAt(a),c=i>=0?f.charCodeAt(i):-1;d.push({s:a,e:r,ls:i,le:s,n:34===t||39===t?b(a+1,t):f.slice(a,r),ln:i<0?void 0:34===c||39===c?b(i+1,c):f.slice(i,s)})}return[w,d,!!e.f()]}function b(e,a){n=e;let r="",i=n;for(;;){n>=f.length&&o();const e=f.charCodeAt(n);if(e===a)break;92===e?(r+=f.slice(i,n),r+=l(),i=n):(8232===e||8233===e||u(e)&&o(),++n)}return r+=f.slice(i,n++),r}function l(){let e=f.charCodeAt(++n);switch(++n,e){case 110:return"\n";case 114:return"\r";case 120:return String.fromCharCode(k(2));case 117:return function(){const e=f.charCodeAt(n);let a;123===e?(++n,a=k(f.indexOf("}",n)-n),++n,a>1114111&&o()):a=k(4);return a<=65535?String.fromCharCode(a):(a-=65536,String.fromCharCode(55296+(a>>10),56320+(1023&a)))}();case 116:return"\t";case 98:return"\b";case 118:return"\v";case 102:return"\f";case 13:10===f.charCodeAt(n)&&++n;case 10:return"";case 56:case 57:o();default:if(e>=48&&e<=55){let a=f.substr(n-1,3).match(/^[0-7]+/)[0],r=parseInt(a,8);return r>255&&(a=a.slice(0,-1),r=parseInt(a,8)),n+=a.length-1,e=f.charCodeAt(n),"0"===a&&56!==e&&57!==e||o(),String.fromCharCode(r)}return u(e)?"":String.fromCharCode(e)}}function k(e){const a=n;let r=0,i=0;for(let a=0;a<e;++a,++n){let e,s=f.charCodeAt(n);if(95!==s){if(s>=97)e=s-97+10;else if(s>=65)e=s-65+10;else{if(!(s>=48&&s<=57))break;e=s-48}if(e>=16)break;i=s,r=16*r+e}else 95!==i&&0!==a||o(),i=s}return 95!==i&&n-a===e||o(),r}function u(e){return 13===e||10===e}function o(){throw Object.assign(Error(`Parse error ${c}:${f.slice(0,n).split("\n").length}:${n-f.lastIndexOf("\n",n-1)}`),{idx:n})}