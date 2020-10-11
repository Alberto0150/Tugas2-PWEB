const CACHE_KEY = "calculation_history";

function checkForStorage() {
    return typeof(Storage) !== "undefined"
}

function putHistory(data){
    if(checkForStorage())
    {
        let historyData = null;
        if(localStorage.getItem(CACHE_KEY) === null)
        {
            historyData = [];
        }
        else
        {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
            // untuk mengubah nilai objek dalam bentuk string kembali ke bentuk objek js
        }
    

        historyData.unshift(data);
        //untuk menambahkan nilai baru pada array yang ditempatkan pada awal index
        if(historyData.length > 5) 
        {
            historyData.pop();
            //menghapus nilai index terakhir pada array
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
        //mengubah objek js ke dalam bentuk string KARNA localstorage hanya bisa menyimpan data primitif
    }
}

/* fungsi untuk mengembalikan nilai array dari localStorage jika sudah
    memiliki nilai sebelumnya melalui JSON.parse().

    jika kosong, mengembalikan array kosong
*/
function showHistory(){
    if(checkForStorage()){
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    }
    else
    {
        return [];
    }
}

function renderHistory(){
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");

    historyList.innerHTML = ""; //hapus konten html agar tidak tampil data ganda

    for (let history of historyData)
    {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";

        historyList.appendChild(row);
    }
}

renderHistory();