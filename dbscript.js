/*----Db open/create => camera ----*/
/*----Db object store => gallery ----*/
/*----photo/video capture jo hui uskko => gallery(-object store ) ----*/

/*----Data format

let data={

mId: 16545542313,
mType: "image"/"video",
media: actual content ( image=> toDataURL , video=> blob to be stored);
}

----*/

/*--------------main---------------*/

let db = "camera";
let v = 1;
let dbAccess;

let request = indexedDB.open(db, v); // request to brower to open a database with name and version

request.addEventListener("success", function () {
  dbAccess = request.result;
});

request.addEventListener("upgradeneeded", function () {
    let db= request.result;
    db.createObjectStore("gallery", { keyPath: "mId" }); // createobjStore event can be only done in upgradneeded event
});

request.addEventListener("error", function () {
    alert("something went wrong !")
});



function addMedia(type, media) {
  // dbname -Camera --> gallery --> object store

  let tx = dbAccess.transaction("gallery", "readwrite"); // dbstorename , mode --> this is a transaction

  let galleryObjectStore = tx.objectStore("gallery"); //opening obj store

  let data = {
    mId: Date.now(),
    type,
    media,
  };
  galleryObjectStore.add(data);
}
