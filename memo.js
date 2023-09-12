// let img;
// let pix_hoso, pix_niti, ikisaki, plist, crossinfo;

// function preload(){
//     img = loadImage('diagrams_2977/10_25.png');
// }

// function setup(){
//     createCanvas(windowWidth, windowHeight);

//     pix_niti = nitika(img);
//     pix_hoso = newhososenka(pix_niti);  

//     let branches = checkBranch(pix_hoso);   //枝分かれの数を調べる
//     if(branches[0]==1 && branches[1]==0){   //3つ又が1個だけのとき
//         pix_hoso = deleteBranch1(pix_hoso);
//     }
//     if(branches[0]==2 && branches[1]==0){
//         pix_hoso = deleteBranch2(pix_hoso);
//     }

//     ikisaki = pairing(pix_hoso);

//     plist = pix2plist(pix_hoso);
//     plist = sortplist(plist, ikisaki);

//     crossinfo = split2(plist);

//     let code = cross2dowker(crossinfo, 0, false);

//     console.log(dok2alex(code));
//     console.log(dok2jones(code));

//     image(img, 0, 0);
// }

function setup(){

    //変換前の多項式の文字列
    str = '-t^(-5)+3t^(-4)-8t^(-3)+13t^(-2)-16t^(-1)+20-18t+16t^2-12t^3+6t^4-3t^5+t^6';

    let list = [];  //多項式の項を格納する配列
    let start = 0

    if(str.charAt(0)!='-')  str = '+' + str;    //多項式が'-'始まりでなければ'+'を頭に追加

    for(let i=1; i<str.length; i++){
        //i文字目が'+'または'-'で、i-1文字目が'('でなければ、startからi-1文字目までの文字列（項）を配列に追加する　startをiとする
        if( (str.charAt(i)=='+'||str.charAt(i)=='-') && str.charAt(i-1)!='('){
            list.push(str.slice(start, i));
            start = i;
        }
    }
    list.push(str.slice(start,str.length)); //残った最後の文字列を配列に追加

    //指数の符号反転
    for(let i=0; i<list.length; i++){
        if(list[i].indexOf('(')!=-1){   //項に()が含まれる　負べき
            list[i] = list[i].split(')').join('');  //')'を削除
            list[i] = list[i].split('(-').join(''); //'(-'を削除
            if(list[i].slice(-2)=='^1')  list[i]=list[i].slice(0,-2);  //この項の最後2文字が'^1'ならばこの2文字を削除
        }else if(list[i].indexOf('^')!=-1){ //項に()がなく、^が含まれる 指数が2以上
            list[i] = list[i].split('^').join('^(-');  //'^'を'^(-'に置換
            list[i] += ')'; //項の最後に')'を追加
        }else if(list[i].indexOf('t')!=-1){  //単項式
            list[i] += '^(-1)'  //項の最後に'^(-1)を追加'
        }
        //定数項は何もしない
    }

    list.reverse(); //配列をリバース（項の順番を逆にする）
    if(list[0].charAt(0)=='+')  list[0] = list[0].slice(1); //1番最初の項の1文字目が'+'ならば'+'を削除

    //配列の要素を結合して1つの文字列にする
    let result = '';  
    for(let i=0; i<list.length; i++)    result += list[i];

    //変換後
    console.log(result);

}