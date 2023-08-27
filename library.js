function det(a){
    let n=a.length;

    if(n==1) return a[0][0];
    if(n==2) return a[0][0]*a[1][1]-a[0][1]*a[1][0];

    let result=0;
    for(let k=0;k<n;k++){
        let b=new Array(n-1);
        for(let i=0;i<n-1;i++)   b[i]=new Array(n-1);
        
        for(let i=0;i<n-1;i++)   for(let j=0;j<n-1;j++){
            if(i<k)    b[i][j]=a[i][j+1];
            else b[i][j]=a[i+1][j+1];
        }

        result+=a[k][0]*((-1)**k)*determinant(b);
    }
    
    return result;
}


//多項式の加算
function polyadd(a,b){
    let n=Math.max(a.length,b.length);
    let result=new Array(n);
    for(let i=0;i<n;i++)    result[i]=0;
    for(let i=0;i<a.length;i++) result[i+n-a.length]+=a[i];
    for(let i=0;i<b.length;i++) result[i+n-b.length]+=b[i];
    for(let i=0;i<n-1;i++){
        if(result[0]==0)    result.shift();
        else    break;
    }
    return result;
}


//多項式の減算
function polysub(a,b){
    let n=Math.max(a.length,b.length);
    let result=new Array(n);
    for(let i=0;i<n;i++)    result[i]=0;
    for(let i=0;i<a.length;i++) result[i+n-a.length]+=a[i];
    for(let i=0;i<b.length;i++) result[i+n-b.length]-=b[i];
    for(let i=0;i<n-1;i++){
        if(result[0]==0)    result.shift();
        else    break;
    }
    return result;
}


//多項式の乗算
function polymul(a,b){
    let n=a.length+b.length-1;
    let arr=new Array(n);
    for(let i=0;i<n;i++)    arr[i]=[];
    result=new Array(n);

    for(let i=0;i<a.length;i++) for(let j=0;j<b.length;j++){
        arr[i+j].push([i,j]);
    }

    for(let i=0;i<n;i++){
        let sum=0;
        for(let j=0;j<arr[i].length;j++)    sum += a[ arr[i][j][0] ] * b[ arr[i][j][1] ];
        result[i]=sum;
    }

    for(let i=0;i<n-1;i++){
        if(result[0]==0)    result.shift();
        else    break;
    }

    return result;
}


function polydot(a,c){
    if(c==0)    return [0];
    let result=new Array(a.length);
    for(let i=0;i<a.length;i++) result[i]=a[i]*c;
    return result;
}


//要素が多項式の行列の行列式
function polydet(a){
    let n=a.length;

    if(n==1) return a[0][0];
    if(n==2) return polysub(polymul(a[0][0],a[1][1]),polymul(a[0][1],a[1][0]));

    let result=[0];
    for(let k=0;k<n;k++)    if(a[k][0]!=0){
        let b=new Array(n-1);
        for(let i=0;i<n-1;i++)   b[i]=new Array(n-1);
        
        for(let i=0;i<n-1;i++)   for(let j=0;j<n-1;j++){
            if(i<k)    b[i][j]=a[i][j+1];
            else b[i][j]=a[i+1][j+1];
        }

        let tem=polymul(a[k][0],polydet(b));
        tem=polydot(tem,(-1)**k);
        result=polyadd(result,tem);
    }
    
    return result;
}


//ザイフェルト行列からアレクサンダー多項式
function sei_alex(a){

    let n = a.length;
    let b = new Array(n);
    let mat = new Array(n);
    for(let i=0; i<n; i++)  mat[i] = new Array(n);

    for(let i=0; i<n; i++)  for(let j=0; j<n; j++)  mat[i][j] = [a[i][j]];

    for(let i=0;i<n;i++)    b[i] = new Array(n);
    for(let i=0;i<n;i++)    for(let j=0;j<n;j++){
        let tem = mat[j][i].concat();
        tem.push(0);
        b[i][j] = tem;
    }

    for(let i=0;i<n;i++)    for(let j=0;j<n;j++)    mat[i][j] = polysub(mat[i][j],b[i][j]);
    return polydet(mat);
}


//2線分の交点
function crosspoint(va,vb,vc,vd){
    if(va.x==vc.x && va.y==vc.y)    return false;
    if(va.x==vd.x && va.y==vd.y)    return false;
    if(vb.x==vc.x && vb.y==vc.y)    return false;
    if(vb.x==vd.x && vb.y==vd.y)    return false;

    let r,s,acx,acy,bunbo;
    acx=vc.x-va.x;
    acy=vc.y-va.y;
    bunbo=(vb.x-va.x)*(vd.y-vc.y)-(vb.y-va.y)*(vd.x-vc.x);
    r=((vd.y-vc.y)*acx-(vd.x-vc.x)*acy)/bunbo;
    s=((vb.y-va.y)*acx-(vb.x-va.x)*acy)/bunbo;
    if(r>=0&&r<=1&&s>=0&&s<=1)    return new p5.Vector((1-r)*va.x+r*vb.x, (1-r)*va.y+r*vb.y);
    else    return false;
}


//端点Aの行先の行先が端点A出ない場合→端点Aの行先の行先を端点Aとする
function modifyArrow(arg){
    let result = matrixCopy(arg);

    for(let i=0; i<arg.length; i++){
        let flag = true;
        for(let j=0; j<arg.length; j++){
            if(i!=j){
                if(arg[i][0]==arg[j][2] && arg[i][1]==arg[j][3])    flag=false;
            }
        }
        if(flag){
            for(let j=0; j<arg.length; j++) if(i!=j){
                if(arg[i][2]==arg[j][0] && arg[i][3]==arg[j][1]){
                    arg[j][2] = result[i][0];
                    arg[j][3] = result[i][1];
                    break;
                }
            }
        }
    }
    
    return result;
}


//繋がりチェック　相互につながっていたらtrue
function checkArrow(arg){
    let lista = new Array(arg.length);
    for(let i=0; i<lista.length; i++)   lista[i] = 0;

    for(let i=0; i<arg.length; i++){
        for(let j=0; j<arg.length; j++){
            if(arg[i][2]==arg[j][0] && arg[i][3]==arg[j][1]){
                lista[j]++;
                break;
            }
        }
    }

    let cou = 0;
    for(let i=0; i<arg.length; i++){
        for(let j=0; j<arg.length; j++) if(j!=i){
            if(arg[j][0]==arg[i][2]&&arg[j][1]==arg[i][3]){
                if(arg[i][0]!=arg[j][2] || arg[i][1]!=arg[j][3])  if(lista[i]!=1)  cou++;
                break;
            }
        }
    }
    
    return cou;
}


//線が短くならない細線化
function newhososenka(arg){
    let result = new Array(arg.length);
    for(let i=0; i<result.length; i++)  result[i] = arg[i].concat();

    let tmp;

    for(let k=0; k<99999; k++){
        tmp = 0;
        tmp += hoso1step(result, k);
        tmp += shave(result);

        if(tmp==0)  return result;

    }

    return result;

    //頂点繋がりだけにする
    function shave(arg){

        let flag;

        for(let k=0; k<99999; k++){
            flag = true;
            for(let i=1; i<arg.length-1; i++) for(let j=1; j<arg[0].length-1; j++){
                if(f4(arg,i,j) && f2(arg,i,j)<=4 && (f1(arg,i,j)==2||f1(arg,i,j)==3)){
                    flag = false;
                    arg[i][j] = 0;
                }
            }
            if(flag){
                return k;
            }
        }

        return -1;

    }

    //二値の二次元配列を細線化
    function hoso1step(arg, parity){
        let argtem = new Array(arg.length);
        
        let tem, cou=0;

        for(let i=0; i<argtem.length; i++)  argtem[i] = arg[i].concat();
        for(let i=1; i<img.height-1; i++)    for(let j=1; j<img.width-1; j++){
            if(arg[i][j]){
                tem = fxy(i,j);
                if(tem){
                    argtem[i][j] = 0;
                    cou++;
                }
            }
        }
        for(let i=0; i<argtem.length; i++)  for(let j=0; j<argtem[0].length; j++)   arg[i][j] = argtem[i][j];


        function fxy(y,x){
            let t2,t4,t6,t8,tem;
            t2 = arg[y-1][x];
            t4 = arg[y][x+1];
            t6 = arg[y+1][x];
            t8 = arg[y][x-1];
            if(parity%2==0) tem = t2*t4*t6==0 && t4*t6*t8==0;
            else    tem = t2*t4*t6==0 && t4*t6*t8==0;
            if(f1(arg,y,x)>=2 && f1(arg,y,x)<=6 && f2(arg,y,x)==2 && tem){
                return true;
            }
            return false;
        }

        return cou;

    }

    //周囲8ピクセルのうちtrueの個数
    function f1(p,y,x){
        return p[y-1][x] + p[y-1][x+1] + p[y][x+1] + p[y+1][x+1] + p[y+1][x] + p[y+1][x-1] + p[y][x-1] + p[y-1][x-1];
    }

    //周囲を一周したときtrue, falseが反転する回数
    function f2(p,y,x){

        let cou = 0;

        cou += abs(p[y-1][x] - p[y-1][x+1]);
        cou += abs(p[y-1][x+1] - p[y][x+1]);
        cou += abs(p[y][x+1] - p[y+1][x+1]);
        cou += abs(p[y+1][x+1] - p[y+1][x]);
        cou += abs(p[y+1][x] - p[y+1][x-1]);
        cou += abs(p[y+1][x-1] - p[y][x-1]);
        cou += abs(p[y][x-1] - p[y-1][x-1]);
        cou += abs(p[y-1][x-1] - p[y-1][x]);
        
        return cou;
    }


    function f4(p,y,x){
        if(!p[y][x])    return false;
        if(p[y-1][x]!=1 && p[y][x-1]!=1 && p[y+1][x]==1 && p[y][x+1]==1)    return true;
        if(p[y-1][x]==1 && p[y][x-1]!=1 && p[y+1][x]!=1 && p[y][x+1]==1)    return true;
        if(p[y-1][x]==1 && p[y][x-1]==1 && p[y+1][x]!=1 && p[y][x+1]!=1)    return true;
        if(p[y-1][x]!=1 && p[y][x-1]==1 && p[y+1][x]==1 && p[y][x+1]!=1)    return true;
        return false;
    }
}


//画像を二値化し、２次元配列を返す
function nitika(arg){
    let result = new Array(arg.height);
    for(let i=0; i<result.length; i++)  result[i] = new Array(arg.width);
    for(let i=0; i<result.length; i++)  for(let j=0; j<result[0].length; j++){
        if(red(arg.get(i,j))<60)    result[i][j] = 1;
        else    result[i][j] = 0;
    }
    //1ピクセルの穴埋め
    for(let i=1; i<result.length-1; i++)    for(let j=1; j<result.length-1; j++){
        if(result[i][j]==0 && result[i-1][j]==1 && result[i+1][j]==1 && result[i][j-1]==1 && result[i][j+1]==1) result[i][j] = 1;
    }
    return result;
}


//細線化されたデータから端点の数を返す
function endCount(arg){
    
    let result = 0;

    for(let i=1; i<arg.length-1; i++) for(let j=1; j<arg[i].length-1; j++){
        if(arg[i][j]==1 && f2(i,j)==2)   result++;
    }

    //周囲を一周したときtrue, falseが反転する回数
    function f2(y,x){

        let cou = 0;

        cou += abs(arg[y-1][x] - arg[y-1][x+1]);
        cou += abs(arg[y-1][x+1] - arg[y][x+1]);
        cou += abs(arg[y][x+1] - arg[y+1][x+1]);
        cou += abs(arg[y+1][x+1] - arg[y+1][x]);
        cou += abs(arg[y+1][x] - arg[y+1][x-1]);
        cou += abs(arg[y+1][x-1] - arg[y][x-1]);
        cou += abs(arg[y][x-1] - arg[y-1][x-1]);
        cou += abs(arg[y-1][x-1] - arg[y-1][x]);
        
        return cou;
    }

    return result;
}


//孤立した点があるか
function existDot(arg){
    for(let i=1; i<arg.length-1; i++)   for(let j=1; j<arg[0].length-1; j++){
        if(arg[i][j]==1 && arg[i-1][j]==0 && arg[i-1][j+1]==0 && arg[i][j+1]==0 && arg[i+1][j+1]==0 && arg[i+1][j]==0
            && arg[i+1][j-1]==0 && arg[i][j-1]==0 && arg[i-1][j-1]==0)  return true;
    }
    return false;
}


//枝分かれが存在するか　出力：[3つ又の個数, 4つ又の個数]
function checkBranch(arg){

    let result = [0,0];

    for(let i=1; i<arg.length-1; i++)   for(let j=1; j<arg[0].length-1; j++){
        if(arg[i][j]==1){
            if(f2(i,j)==6)  result[0]++;
            if(f2(i,j)==8)  result[1]++;
        }    
    }

    return result;

    //周囲を一周したときtrue, falseが反転する回数
    function f2(y,x){

        let cou = 0;

        cou += abs(arg[y-1][x] - arg[y-1][x+1]);
        cou += abs(arg[y-1][x+1] - arg[y][x+1]);
        cou += abs(arg[y][x+1] - arg[y+1][x+1]);
        cou += abs(arg[y+1][x+1] - arg[y+1][x]);
        cou += abs(arg[y+1][x] - arg[y+1][x-1]);
        cou += abs(arg[y+1][x-1] - arg[y][x-1]);
        cou += abs(arg[y][x-1] - arg[y-1][x-1]);
        cou += abs(arg[y-1][x-1] - arg[y-1][x]);
        
        return cou;
    }
}


//3つ又が1個存在する細線を修復する 'error'を返すこともある
function deleteBranch1(arg){
    let matay, matax;

    //3つ又の位置を調べる
    let breakf = false;
    for(let i=1; i<arg.length; i++){
        for(let j=1; j<arg.length-1; j++){
            if(f2(i,j)==6 && arg[i][j]==1){
                matay = i;
                matax = j;
                breakf = true;
                break;
            }
        }
        if(breakf)  break;
    }

    //3つ又の周囲は黒が３個なのか確認（不要ならばあとで消す）
    if(f1(matay,matax)!=3)  return 'error';

    let newpix = new Array(3);  //3つ又の隣のピクセルを削除した3通りの画像
    for(let i=0; i<3; i++)  newpix[i] = matrixCopy(arg);

    let dy = [-1, -1, 0, 1, 1, 1, 0, -1];
    let dx = [0, 1, 1, 1, 0, -1, -1, -1];

    let i1 = 0;
    for(let k=0; k<8; k++){
        if(arg[matay+dy[k]][matax+dx[k]]==1){
            newpix[i1][matay+dy[k]][matax+dx[k]] = 0;
            i1++;
        }
    }

    //3通りの画像でペアリングしてどれだけうまくいっているか
    let sougo_error = new Array(3);
    for(let i=0; i<3; i++){
        let arrow = pairing(newpix[i]);
        sougo_error[i] = checkArrow(arrow);
    }

    //うまくいっているものは３つのうち１個だけであることを確認
    let cou=0, m;
    for(let i=0; i<3; i++){
        if(sougo_error[i]==0){
            cou++;
            m = i;
        }
    }
    if(cou==1){
        return newpix[m];
    }else{
        return 'error';
    }

    //周囲8ピクセルのうちtrueの個数
    function f1(y,x){
        return arg[y-1][x] + arg[y-1][x+1] + arg[y][x+1] + arg[y+1][x+1] + arg[y+1][x] + arg[y+1][x-1] + arg[y][x-1] + arg[y-1][x-1];
    }

    //周囲を一周したときtrue, falseが反転する回数
    function f2(y,x){

        let cou = 0;

        cou += abs(arg[y-1][x] - arg[y-1][x+1]);
        cou += abs(arg[y-1][x+1] - arg[y][x+1]);
        cou += abs(arg[y][x+1] - arg[y+1][x+1]);
        cou += abs(arg[y+1][x+1] - arg[y+1][x]);
        cou += abs(arg[y+1][x] - arg[y+1][x-1]);
        cou += abs(arg[y+1][x-1] - arg[y][x-1]);
        cou += abs(arg[y][x-1] - arg[y-1][x-1]);
        cou += abs(arg[y-1][x-1] - arg[y-1][x]);
        
        return cou;
    }

}


//3つ又が2個存在する細線を修復する
function deleteBranch2(arg){
    let matay = [];
    let matax = [];

    //３つ又の位置を調べる
    for(let i=1; i<arg.length-1; i++){
        for(let j=1; j<arg.length-1; j++){
            if(f2(i,j)==6 && arg[i][j]==1){
                matay.push(i);
                matax.push(j);
            }
            if(matay.length==2)  break;
        }
        if(matay.length==2);
    }

    //3つ又の周囲が黒3個であることを確認
    if(f1(matay[0],matax[0])!=3 || f1(matay[1],matax[1])!=3)    return 'error';

    //9個コピー
    let newpix = new Array(9);
    for(let i=0; i<newpix.length; i++)  newpix[i] = matrixCopy(arg);

    let dy = [-1, -1, 0, 1, 1, 1, 0, -1];
    let dx = [0, 1, 1, 1, 0, -1, -1, -1];

    let cou=0;
    for(let i1=0; i1<8; i1++){
        if(arg[matay[0]+dy[i1]][matax[0]+dx[i1]]==1){
            for(let i2=0; i2<8; i2++){
                if(arg[matay[1]+dy[i2]][matax[1]+dx[i2]]==1){
                    newpix[cou][matay[0]+dy[i1]][matax[0]+dx[i1]] = 0;
                    newpix[cou][matay[1]+dy[i2]][matax[1]+dx[i2]] = 0;
                    cou++;
                }
            }    
        }
    }
    //break使ったら処理減らせるかも

    //9通りの画像でペアリングしてどれだけうまくいっているか
    let endc = endCount(arg);
    let sougo_error = new Array(9);
    for(let i=0; i<9; i++){
        let arrow = pairing(newpix[i]);
        sougo_error[i] = checkArrow(arrow);
        if(endCount(newpix[i])!=endc+2) sougo_error[i] = 999;
    }

    background(255);
    noStroke();
    let index = 8;
    for(let i=1; i<newpix[index].length-1; i++)    for(let j=1; j<newpix[index][0].length-1; j++){
        if(newpix[index][i][j]==0)    fill(255);
        if(arg[i][j]==1)    fill(100,100,255);
        if(newpix[index][i][j]==1)    fill(0);
        rect(i, j, 1);
    }

    //うまくいっているものは９つのうち１つだけであることを確認
    let cou0 = 0, cou1 = 0, m0, m1;
    for(let i=0; i<sougo_error.length; i++){
        if(sougo_error[i]==0){
            cou0++;
            m0 = i;
        }
        if(sougo_error[i]==1){
            cou1++;
            m1 = i;
        }
    }

    if(cou0==1){
        return newpix[m0];
    }else if(cou0==0 && cou1==1){
        return newpix[m1];
    }else{
        return 'error';
    }

    

    //周囲8ピクセルのうちtrueの個数
    function f1(y,x){
        return arg[y-1][x] + arg[y-1][x+1] + arg[y][x+1] + arg[y+1][x+1] + arg[y+1][x] + arg[y+1][x-1] + arg[y][x-1] + arg[y-1][x-1];
    }

    //周囲を一周したときtrue, falseが反転する回数
    function f2(y,x){

        let cou = 0;

        cou += abs(arg[y-1][x] - arg[y-1][x+1]);
        cou += abs(arg[y-1][x+1] - arg[y][x+1]);
        cou += abs(arg[y][x+1] - arg[y+1][x+1]);
        cou += abs(arg[y+1][x+1] - arg[y+1][x]);
        cou += abs(arg[y+1][x] - arg[y+1][x-1]);
        cou += abs(arg[y+1][x-1] - arg[y][x-1]);
        cou += abs(arg[y][x-1] - arg[y-1][x-1]);
        cou += abs(arg[y-1][x-1] - arg[y-1][x]);
        
        return cou;
    }
}


//細線化ピクセルデータと行先の配列からドーカーコードを求める
function pix2dowker(arg, arrow){

    let pix = matrixCopy(arg);
    let pix_arcnum = matrixCopy(arg);

    let x, y, x1, y1, x2, y2;
    let n, index;

    let dy = [-1, 0, 1, 0, -1, 1, 1, -1];
    let dx = [0, 1, 0, -1, 1, 1, -1, -1];

    //単１ピクセルを削除
    for(let i=1; i<arg.length-1; i++)   for(let j=1; j<arg.length-1; j++){
        if(arg[i][j]==1 && arg[i-1][j]==0 && arg[i-1][j+1]==0 && arg[i][j+1]==0 && arg[i+1][j+1]==0
        && arg[i+1][j]==0 && arg[i+1][j-1]==0 && arg[i][j-1]==0 && arg[i-1][j-1]==0){
            pix[i][j] = 0;
            pix_arcnum[i][j] = 0;
        }
    }

    //pix_arcnumを準備のため1を-1に置換
    for(let i=1; i<pix_arcnum.length-1; i++)    for(let j=1; j<pix_arcnum.length-1; j++){
        if(arg[i][j]==1){
            pix_arcnum[i][j] = -1;
            pix[i][j] = -1;
        }
    }


    //pix_arcnumにアーク番号をふる
    index = 0;
    n = 1;

    for(let k1=0; k1<arrow.length/2; k1++){

        y = arrow[index][0];
        x = arrow[index][1];

        pix_arcnum[y][x] = n;

        for(let k=0; k<99999; k++){
            let flag = true;
            for(let i=0; i<8; i++){
                if(pix_arcnum[y+dy[i]][x+dx[i]]==-1){
                    pix_arcnum[y+dy[i]][x+dx[i]]=n;
                    y += dy[i];
                    x += dx[i];
                    flag = false;
                    break;
                }
            }
            if(flag)    break;  //たどり終わった
        }

        n++;
        for(let i=0; i<arrow.length; i++){
            index++;
            if(index >= arrow.length)   break;
            if(pix_arcnum[ arrow[index][0] ][ arrow[index][1] ]==-1)    break;
        }

    }

    //交点を探す ２端点と交点に同じ番号をふる
    n = 1;
    index = 0;

    for(let k1=0; k1<arrow.length/2; k1++){

        //スタートの端点
        y1 = arrow[index][0];   
        x1 = arrow[index][1];
        //行先の端点
        y2 = arrow[index][2];
        x2 = arrow[index][3];
        
        //たどっている最中注目しているピクセル座標
        x = x1, y = y1;

        //変位
        let xs, ys;

        if(x2>x1) xs = 1;
        else  xs = -1;
        if(y2>y1) ys = 1;
        else ys = -1;

        for(let k=0; k<99999; k++){

            if(y1 == y2)  x+=xs;
            else if( ((y-y1)*(x2-x1) < (y2-y1)*(x-x1)&&xs*ys==-1) || ((y-y1)*(x2-x1) > (y2-y1)*(x-x1)&&xs*ys==1)) x+=xs;
            else  y+=ys;

            //アークを横切ったとき　スタートのアークでもゴールのアークでもない
            if(pix[y][x]==-1 && pix_arcnum[y][x]!=pix_arcnum[y1][x1] && pix_arcnum[y][x]!=pix_arcnum[y2][x2]){
                pix[y][x] = n;
                pix[y1][x1] = n;
                pix[y2][x2] = n;
                break;
            }
        }

        n++;
        for(let i=0; i<arrow.length; i++){
            index++;
            if(index >= arrow.length)   break;
            if(pix[ arrow[index][0] ][ arrow[index][1] ]==-1)    break;
        }

    }

    //pixをたどり0で埋めていく
    
    //基点
    y1 = arrow[0][0];
    x1 = arrow[0][1];

    y = y1;
    x = x1;

    n = 1;

    crosslist.push([y, x, n-1]);

    let fulldowker = new Array(arrow.length/2);
    for(let i=0; i<fulldowker.length; i++)  fulldowker[i] = new Array(2);
    fulldowker[pix[y][x]-1][0] = n;
    n++;

    let endflag = false;

    for(let k=0; k<999999; k++){
        for(let i=0; i<8; i++){
            if(pix[y+dy[i]][x+dx[i]]!=0){
                pix[y][x] = 0;
                y += dy[i];
                x += dx[i];
                if(pix[y][x] != -1){
                    if(f2s(y,x)==2){    //端点
                        for(let j=0; j<arrow.length; j++){
                            if(arrow[j][0]==y && arrow[j][1]==x){
                                pix[y][x] = 0;
                                y = arrow[j][2];
                                x = arrow[j][3];
                                if(y==y1 && x1==x){ //スタートに戻ってきた　終了
                                    endflag = true;
                                }else{
                                    fulldowker[pix[y][x]-1][0] = n;
                                    crosslist.push([y, x, n-1]);
                                    n++;
                                }
                                break;
                            }
                        }
                    }else{  //交点
                        fulldowker[pix[y][x]-1][1] = n;
                        n++;
                    }
                }   
                break;
            }
        }
        if(endflag) break;
    }

    for(let i=0; i<fulldowker.length; i++){
        if(fulldowker[i][0]%2==0){
            let tmp = fulldowker[i][0];
            fulldowker[i][0] = fulldowker[i][1];
            fulldowker[i][1] = - tmp;
        }
    }

    fulldowker.sort(function(a,b){return a[0]-b[0]});

    let result = new Array(fulldowker.length);
    for(let i=0; i<result.length; i++)  result[i] = fulldowker[i][1];
    
    return result;

    //周囲を一周したときtrue, falseが反転する回数
    function f2s(y,x){

        let cou = 0;

        cou += noteq(arg[y-1][x], arg[y-1][x+1]);
        cou += noteq(arg[y-1][x+1], arg[y][x+1]);
        cou += noteq(arg[y][x+1], arg[y+1][x+1]);
        cou += noteq(arg[y+1][x+1], arg[y+1][x]);
        cou += noteq(arg[y+1][x], arg[y+1][x-1]);
        cou += noteq(arg[y+1][x-1], arg[y][x-1]);
        cou += noteq(arg[y][x-1], arg[y-1][x-1]);
        cou += noteq(arg[y-1][x-1], arg[y-1][x]);

        function noteq(a,b){
            if((a==0&&b!=0) || (a!=0&&b==0))    return 1;
            else    return 0;
        }
        
        return cou;
    }
    
}


//二次元配列のコピー
function matrixCopy(arg){
    result = new Array(arg.length);
    for(let i=0; i<arg.length; i++) result[i] = arg[i].concat();
    return result;
}


//ドーカーコードからドーカー対
function dok2pair(dok){
    let list = [[0,0]];
    let result;
    for(let i=0; i<dok.length; i++){
        list.push([i*2+1,dok[i]]);
        list.push([dok[i],i*2+1]);
    }
    list.sort(function(a,b){return(abs(a[0])-abs(b[0]));});
    
    result = new Array(list.length);
    for(let i=0; i<list.length; i++){
        result[i] = list[i][1];
        if(list[i][0]<0)    result[i] *= -1;
    }
    return result;
}


//ドーカーコードをライズ付きドーカーコードにする
function dok2rise(dok){

    let pair = dok2pair(dok);

    let sign = new Array(pair.length);
    let phi = new Array(pair.length);
    let list = new Array(pair.length);
    let used = new Array(pair.length);

    let m=1;
    let len = pair.length - 1;

    for(let i=1; i<pair.length; i++){
        if(pair[i]>0)   sign[i] = 1;
        else    sign[i] = -1;
        pair[i] = abs(pair[i]);
    }

    list[1] = 1;
    list[pair[1]] = -1;

    for(let k=0; k<len; k++){

        used[m] = true;

        phi[m] = 1;
        for(let i=1; i<pair.length-1; i++){
            if(inside(m, pair[m], pair[(m+i-1)%len+1]))   phi[(m+i-1)%len+1] = phi[(m+i+len-2)%len+1]*(-1);
            else    phi[(m+i-1)%len+1] = phi[(m+i+len-2)%len+1];
        }

        for(let i=1; i<list.length; i++){
            if(inside(m, pair[m], i) && !(inside(m, pair[m], pair[i])) && i!=m && i!=pair[m]){
                list[i] = - list[m] * phi[i] * phi[pair[i]];
                list[pair[i]] = - list[i];
            }
        }

        for(let i=1; i<list.length; i++){
            if(list[i]!=null && used[i]==null){
                m = i;
                break;
            }
        }

        if(full(list))    break;
    }


    let result = [];
    for(let i=1; i<pair.length; i+=2){
        result.push([pair[i]*sign[i],list[i]*sign[i]]);
    }
    
    return result;

    function full(a){
        for(let i=1; i<a.length; i++){
            if(a[i] == null)   return false;
        }
        return true;
    }

    function inside(a1, a2, b){
        if(a1 < a2){
            if(a1<=b && b<=a2)    return true;
            else    return false;
        }else{
            if(!(a1<=b && b<=a2)) return true;
            else    return false;
        }
    }
}


//ライズ付きドーカー対からアレキサンダー多項式の係数リスト
function dok2alex(doks){

    let dok = new Array(doks.length);
    let sign0 = new Array(doks.length+1);
    let sign = new Array(doks.length*2);
    let result;

    for(let i=0; i<doks.length; i++){
        dok[i] = doks[i][0];
        sign0[i+1] = doks[i][1];
    }

    let pair = dok2pair(dok);

    for(let i=1; i<sign0.length; i++){
        sign[i*2-1] = sign0[i];
        sign[abs(pair[i*2-1])] = sign0[i];
    }

    let arc = [];
    let list = new Array(dok.length);
    
    let sw = true;
    for(let i=1;; i++){
        if(sw){
            if((i%2==1&&pair[i]>0) || (i%2==0&&pair[i]<0)){
                arc.push([i]);
                sw = false;
            }
        }else{
            if((i%2==0&&pair[i]<0) || (i%2==1&&pair[i]>0)){
                arc[arc.length-1].push(i);
                sw = true;
                i--;
                if(arc.length == dok.length)   break;
            }
        }
        if(i > dok.length*2)  i=0;
    }
    
    for(let i=0; i<dok.length; i++){
        for(let j=0; j<arc.length; j++){
            if(inside(arc[j][0],arc[j][1],abs(pair[arc[i][1]]))){
                list[i] = j;
                break;
            }
        }
    }

    let mat = new Array(dok.length-1);
    for(let i=0; i<mat.length; i++) mat[i] = new Array(mat.length);
    for(let i=0; i<mat.length; i++) for(let j=0; j<mat.length; j++) mat[i][j] = [0];

    for(let i=0; i<mat.length; i++){
        if(sign[arc[i][1]]==1){
            mat[i][i] = polyadd([1,0,0],mat[i][i]);
            if(i+1<mat.length)  mat[i][i+1] = polyadd([0,-1,0],mat[i][i+1]);
            if(list[i]<mat.length)  mat[i][list[i]] = polyadd([-1,1,0],mat[i][list[i]]);
        }else{
            mat[i][i] = polyadd([1],mat[i][i]);
            if(i+1<mat.length)  mat[i][i+1] = polyadd([0,-1,0],mat[i][i+1]);
            if(list[i]<mat.length)  mat[i][list[i]] = polyadd([1,-1],mat[i][list[i]]);
        }
    }

    result = polydet(mat);
    for(;;){
        if(result.length==0) break;
        if(result[result.length-1] == 0)  result.pop();
        else    break;
    }
    if(result[0]<0) for(let i=0; i<result.length; i++)  result[i]*=-1;
    
    return result;
    
    function inside(a1, a2, b){
        if(a1 < a2){
            if(a1<b && b<a2)    return true;
            else    return false;
        }else{
            if(!(a1<b && b<a2)) return true;
            else    return false;
        }
    }
}


//ドーカー全通り
function slideDowker(arg){

    let dowkerpair = new Array(arg.length);
    let slidepair = new Array(arg.length);

    for(let i=0; i<arg.length; i++){
        dowkerpair[i] = [i*2+1, arg[i]];
        slidepair[i] = new Array(3);
    }

    for(let k=0; k<crosslist.length; k++){
        for(let i=0; i<arg.length; i++){
            for(let j=0; j<2; j++){
                slidepair[i][j] = ( (abs(dowkerpair[i][j])+arg.length*2-crosslist[k][2]-1)%(arg.length*2) + 1);
            }
            slidepair[i][2] = arg[i] / abs(arg[i]);
        }
        
        let tmp;
        for(let i=0; i<slidepair.length; i++){
            if(slidepair[i][0]%2==0){
                tmp = slidepair[i][0];
                slidepair[i][0] = slidepair[i][1];
                slidepair[i][1] = tmp;
            }
        }
        slidepair.sort(function(a,b){return a[0]-b[0]});
        
        tmp = new Array(slidepair.length);
        for(let i=0; i<slidepair.length; i++)   tmp[i] = slidepair[i][1] * slidepair[i][2];
        if(tmp[0]<0)    for(let i=0; i<slidepair.length; i++)  tmp[i] *= -1;
        codes1.push(tmp);


        for(let i=0; i<arg.length; i++){
            for(let j=0; j<2; j++){
                slidepair[i][j] = arg.length*2 - abs(slidepair[i][j]) + 2;
                if(slidepair[i][j] > arg.length*2) slidepair[i][j] = 1;
            }
        }

        for(let i=0; i<slidepair.length; i++){
            if(slidepair[i][0]%2==0){
                tmp = slidepair[i][0];
                slidepair[i][0] = slidepair[i][1];
                slidepair[i][1] = tmp;
            }
        }
        slidepair.sort(function(a,b){return a[0]-b[0]});

        tmp = new Array(slidepair.length);
        for(let i=0; i<slidepair.length; i++)   tmp[i] = slidepair[i][1] * slidepair[i][2];
        if(tmp[0]<0)    for(let i=0; i<slidepair.length; i++)  tmp[i] *= -1;
        codes2.push(tmp);

    }

}


//端点の組の決定
function pairing(arg){
    //端点の座標
    let end = [];
    let cross = [];

    //単ドットは端点には含まれない
    for(let i=1; i<arg.length-1; i++)  for(let j=1; j<arg[0].length-1; j++){
        if(f2(arg,i,j)==2 && arg[i][j]==1){
            end.push({'pos':[i,j], 'opposite':null, 'arc':null, 'angle':null, 'pair':null, 'crn':null});
        }
    }    
    
    //端点をたどるとどの端点と繋がっているか
    arg3 = new Array(img.height);
    for(let i=0; i<img.width; i++){
        arg3[i] = [];
        for(let j=0; j<img.height; j++){
            if(arg[i][j]==0)   arg3[i][j]=-1;
            else    arg3[i][j]=-2;
        }
    }
 
    let m;
    let arcnum = 0;

    for(let k=0; k<end.length/2; k++){

        for(let i=0; i<end.length; i++){
            if(end[i].opposite == null){
                m = i;
                break;
            }
        }

        let y1,x1;
        y1 = end[m].pos[0];
        x1 = end[m].pos[1];
        arg3[y1][x1] = arcnum;

        let dy = [-1,0,1,0,-1,1,1,-1];
        let dx = [0,1,0,-1,1,1,-1,-1];

        for(let k=0; k<arg.length**2; k++){
            let flag = true;
            for(let i=0; i<8; i++){
                if(arg3[y1+dy[i]][x1+dx[i]] == -2){
                    arg3[y1+dy[i]][x1+dx[i]] = arcnum;
                    y1 = y1+dy[i];
                    x1 = x1+dx[i]
                    flag = false;
                    break;
                }
            }
            if(flag){
                for(let i=0; i<end.length; i++){
                    if(y1==end[i].pos[0] && x1==end[i].pos[1]){
                        end[m].opposite = i;
                        end[i].opposite = m;
                        end[m].arc = arcnum;
                        end[i].arc = arcnum;
                        break;
                    }
                }
                break;
            }
        }
        arcnum++;
    }  

    //余白:-2 線上：-1 交点：0～
    arg4 = new Array(img.height);
    for(let i=0; i<img.height; i++){
        arg4[i] = new Array(img.width);
        for(let j=0; j<img.width; j++){
            arg4[i][j] = arg[i][j] - 2;
        }
    }
    
    //ペア・交点
    m = 0;
    for(let i=0; i<end.length/2; i++) cross[i] = {'pos':null, 'label':[], 'angle1':null, 'angle2':null}

    for(let k=0; k<end.length; k++) if(end[k].pair==null){

        list = [];
        for(let i=0; i<end.length; i++) if(i!=k){
            list.push([i,dist(end[k].pos[0],end[k].pos[1],end[i].pos[0],end[i].pos[1])]);
        }
        list.sort(function(a,b){return a[1]-b[1]});

        for(let k3=0; k3<end.length; k3++){

            let result = false;
            y1 = end[k].pos[0];
            x1 = end[k].pos[1];
            y2 = end[list[0][0]].pos[0];
            x2 = end[list[0][0]].pos[1];

            let xs,ys,x=x1,y=y1;

            if(x2>x1) xs = 1;
            else  xs = -1;
            if(y2>y1) ys = 1;
            else ys = -1;

            argd = new Array(img.height);
            for(let i=0; i<argd.length; i++)    argd[i] = new Array(img.width);

            for(let k1=0; k1<img.width**2; k1++){
                if(x==x2 && y==y2){
                    break;
                }
            
                if(y1 == y2)  x+=xs;
                else if( ((y-y1)*(x2-x1) < (y2-y1)*(x-x1)&&xs*ys==-1) || ((y-y1)*(x2-x1) > (y2-y1)*(x-x1)&&xs*ys==1)) x+=xs;
                else  y+=ys;

                argd[y][x] = 1;

                //横切った
                if(arg3[y][x]>=0 && arg3[y][x]!=end[list[0][0]].arc && arg3[y][x]!=end[k].arc){
                    arg4[y][x] = m;
                    //cross[m].pos = [y,x];
                    m++;
                    result = true;
                    break;
                }
            
            }
        
            if(result == false){
                list.shift();
            }else   break;

        }

        end[k].pair = list[0][0];
        end[k].crn = m-1;
    
    }

    //周囲8ピクセルのうちtrueの個数
    function f1(p,y,x){
        return p[y-1][x] + p[y-1][x+1] + p[y][x+1] + p[y+1][x+1] + p[y+1][x] + p[y+1][x-1] + p[y][x-1] + p[y-1][x-1];
    }

    //周囲を一周したときtrue, falseが反転する回数
    function f2(p,y,x){

        let cou = 0;

        cou += abs(p[y-1][x] - p[y-1][x+1]);
        cou += abs(p[y-1][x+1] - p[y][x+1]);
        cou += abs(p[y][x+1] - p[y+1][x+1]);
        cou += abs(p[y+1][x+1] - p[y+1][x]);
        cou += abs(p[y+1][x] - p[y+1][x-1]);
        cou += abs(p[y+1][x-1] - p[y][x-1]);
        cou += abs(p[y][x-1] - p[y-1][x-1]);
        cou += abs(p[y-1][x-1] - p[y-1][x]);
        
        return cou;
    }

    let result = new Array(end.length);
    for(let i=0 ;i<result.length; i++){
        result[i] = [end[i].pos[0], end[i].pos[1], end[end[i].pair].pos[0], end[end[i].pair].pos[1]];
    }
    
    return result;

}


//細線画像から点群リストを生成
function pix2plist(arg){

    let pixcopy = matrixCopy(arg);

    let result = [];

    let dy = [-1, 0, 1, 0, -1, 1, 1, -1];
    let dx = [0, 1, 0, -1, 1, 1, -1, -1];

    for(let arcn=0; arcn<99999; arcn++){
        
        let flag2 = false;
        for(let i=0; i<arg.length; i++){
            if(flag2)   break;
            for(let j=0; j<arg[i].length; j++){

                if(pixcopy[i][j]==1 && f2(i,j)==2){ //端点が見つかった
                    flag2 = true;

                    let tmp = [[i,j]];   //ポイントリスト
                    let py = i;
                    let px = j;

                    pixcopy[py][px] = 0;
                    for(let k=1; k<99999; k++){

                        let flag3 = true;
                        for(let d=0; d<8; d++){
                            if(pixcopy[py+dy[d]][px+dx[d]]==1){
                                py = py + dy[d];
                                px = px + dx[d];
                                pixcopy[py][px] = 0;
                                flag3 = false;
                                break;
                            }
                        }

                        if(flag3 || k%4==0) tmp.push([py,px]); 
                        if(flag3)   break;
                    }

                    result.push(tmp);
                    break;
                }

            }

        }

        if(!flag2)    break;
    }

    return result;

    //周囲を一周したときtrue, falseが反転する回数
    function f2(y,x){

        let cou = 0;

        cou += abs(arg[y-1][x] - arg[y-1][x+1]);
        cou += abs(arg[y-1][x+1] - arg[y][x+1]);
        cou += abs(arg[y][x+1] - arg[y+1][x+1]);
        cou += abs(arg[y+1][x+1] - arg[y+1][x]);
        cou += abs(arg[y+1][x] - arg[y+1][x-1]);
        cou += abs(arg[y+1][x-1] - arg[y][x-1]);
        cou += abs(arg[y][x-1] - arg[y-1][x-1]);
        cou += abs(arg[y-1][x-1] - arg[y-1][x]);
        
        return cou;
    }
}


//点群リストを端点のペアを使ってソート 
function sortplist(argpl, argik){

    let result = [argpl[0]];
    let m = 0;

    let sx, sy;

    for(let k=0; k<argpl.length-1; k++){

        for(let i=0; i<argik.length; i++){
            if(argpl[m][argpl[m].length-1][0]==argik[i][0] && argpl[m][argpl[m].length-1][1]==argik[i][1]){
                sx = argik[i][2];
                sy = argik[i][3];
                break;
            }
        }

        let flag = true;

        for(let i=0; i<argpl.length; i++){
            if(sx==argpl[i][0][0] && sy==argpl[i][0][1]){
                result.push(argpl[i]);
                m = i;
                flag = false;
                break;
            }
        }

        for(let i=0; i<argpl.length; i++){
            if(sx==argpl[i][argpl[i].length-1][0] && sy==argpl[i][argpl[i].length-1][1]){
                result.push(argpl[i].reverse());
                m = i;
                break;
            }
        }

    }

    console.log(result);
    return result;
}


function detectCross(pl){
    
    let n = pl.length;

    let result = [];

    let va, vb, vc, vd;

    let crossinfo = [];
    
    for(let k=0; k<n; k++){

        va = new p5.Vector(pl[k][pl[k].length-1][0], pl[k][pl[k].length-1][1]);
        vb = new p5.Vector(pl[(k+1)%n][0][0], pl[(k+1)%n][0][1]);

        for(let i=0; i<pl.length; i++){
            let flag = false;;
            for(let j=0; j<pl[i].length-1; j++){
                vc = new p5.Vector(pl[i][j][0],pl[i][j][1]);
                vd = new p5.Vector(pl[i][j+1][0], pl[i][j+1][1]);
                let tmp = crosspoint(va,vb,vc,vd);
                if(tmp){
                    fill(255, 0, 0);
                    noStroke();
                    circle(tmp.x, tmp.y, 3);
                    flag = true;
                    result[i] = [pl[i].slice(0,j-1), pl[i].slice(j+2)];
                    break;
                }
            }
            if(flag)    break;
        }

    }

    result = result.flat();

    stroke(0, 0, 255);
    strokeWeight(3);
    for(let i=0; i<result.length; i++){
        for(let j=0; j<result[i].length-1; j++){
            line(result[i][j][0], result[i][j][1], result[i][j+1][0], result[i][j+1][1]);
        }
    }
}


/*
メモ

//周囲を一周したときtrue, falseが反転する回数
function f2(y,x){

    let cou = 0;

    cou += abs(arg[y-1][x] - arg[y-1][x+1]);
    cou += abs(arg[y-1][x+1] - arg[y][x+1]);
    cou += abs(arg[y][x+1] - arg[y+1][x+1]);
    cou += abs(arg[y+1][x+1] - arg[y+1][x]);
    cou += abs(arg[y+1][x] - arg[y+1][x-1]);
    cou += abs(arg[y+1][x-1] - arg[y][x-1]);
    cou += abs(arg[y][x-1] - arg[y-1][x-1]);
    cou += abs(arg[y-1][x-1] - arg[y-1][x]);
    
    return cou;
}


let dy = [-1, 0, 1, 0, -1, 1, 1, -1];
let dx = [0, 1, 0, -1, 1, 1, -1, -1];

*/