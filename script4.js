//戻ってくるまでの交点通過回数

let img;
let pix_hoso, pix_niti, ikisaki, plist, crossinfo;

function preload(){
    img = loadImage('diagrams_2977edit/8_20.png');
}

function setup(){
    createCanvas(400, 400);

    pix_niti = nitika(img);
    pix_hoso = newhososenka(pix_niti);

    let branches = checkBranch(pix_hoso);   
    if(branches[0]==1 && branches[1]==0){   
        pix_hoso = deleteBranch1(pix_hoso);
    }
    if(branches[0]==2 && branches[1]==0){
        pix_hoso = deleteBranch2(pix_hoso);
    }

    ikisaki = pairing(pix_hoso);

    plist = pix2plist(pix_hoso);
    plist = sortplist(plist, ikisaki);

    crossinfo = split2(plist);

    console.log(crossinfo);


    background(240);

    strokeWeight(3);
    stroke(0, 0, 255);
    
    for(let i=0; i<plist.length; i++)   for(let j=0; j<plist[i].length-1; j++){
        line(plist[i][j][0], plist[i][j][1], plist[i][j+1][0], plist[i][j+1][1]);
    }

    stroke(255);
    fill(255, 0, 0);
    textAlign(CENTER);
    textSize(8);

    let n = crossinfo.length*2;
    
    for(let i=0; i<crossinfo.length; i++){
        text((n+crossinfo[i][1]-crossinfo[i][0])%n+1, crossinfo[i][6].x, crossinfo[i][6].y);
        text((n-crossinfo[i][1]+crossinfo[i][0])%n+1, crossinfo[i][5].x, crossinfo[i][5].y);
        text((n-(crossinfo[i][1]+1)%n+(crossinfo[i][0]+1)%n)%n+1, crossinfo[i][4].x, crossinfo[i][4].y);
        text((n+(crossinfo[i][1]+1)%n-(crossinfo[i][0]+1)%n)%n+1, crossinfo[i][3].x, crossinfo[i][3].y);
    }

}

function draw(){

}