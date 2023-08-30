let img;

let pix_hoso, pix_niti, ikisaki, plist, crossinfo;

let kname = '6_2';

function preload(){
    img = loadImage('diagrams_2977/' + kname + '.png');
}

function setup(){
    createCanvas(400, 400);

    pix_niti = nitika(img);
    pix_hoso = newhososenka(pix_niti);  
    
    let branches = checkBranch(pix_hoso);   //枝分かれの数を調べる
    if(branches[0]==1 && branches[1]==0){   //3つ又が1個だけのとき
        pix_hoso = deleteBranch1(pix_hoso);
    }
    if(branches[0]==2 && branches[1]==0){
        pix_hoso = deleteBranch2(pix_hoso);
    }

    ikisaki = pairing(pix_hoso);

    plist = pix2plist(pix_hoso);
    plist = sortplist(plist, ikisaki);

    crossinfo = splitarc(plist);

    console.log(cross2dowker(crossinfo, 0, false));
    
    
    rectMode(CENTER);

}


function draw(){

    //描画
    background(255);

    strokeWeight(3);
    stroke(0, 0, 255);
    for(let i=0; i<plist.length; i++){
        for(let j=0; j<plist[i].length-1; j++){
            line(plist[i][j][0], plist[i][j][1], plist[i][j+1][0], plist[i][j+1][1]);
        }
    }

    for(let i=0; i<crossinfo.length; i++){
        if(crossinfo[i][2]) line(crossinfo[i][3].x, crossinfo[i][3].y, crossinfo[i][4].x, crossinfo[i][4].y);
        else    line(crossinfo[i][5].x, crossinfo[i][5].y, crossinfo[i][6].x, crossinfo[i][6].y);
    }

    noStroke();
    fill(255, 0, 0);
    circle(plist[0][0][0], plist[0][0][1], 6);

}


function mouseClicked(){
    for(let i=0; i<crossinfo.length; i++){
        if(dist(mouseX, mouseY, crossinfo[i][7].x, crossinfo[i][7].y)<10){
            crossinfo[i][2] = !crossinfo[i][2];

            let code = cross2dowker(crossinfo, 0, false);
            console.log(code);
            console.log(dok2alex(code));
        }
    }
}


// function keyPressed(){
//     if(keyCode==ENTER)  saveCanvas(kname+'_thin','png');
// }
