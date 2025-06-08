let NewTask = document.querySelector("#nt");

document.querySelector("#add").addEventListener("click", function(){
    let ntv = NewTask.value;
    document.getElementById("errorMsg").innerText = "";

    if(ntv.trim() !== ""){
        let newli = document.createElement("li");
        newli.innerText = ntv;

        let delBtn = document.createElement("button");
        delBtn.innerText = "Delete";
        newli.appendChild(delBtn);

        delBtn.addEventListener("click", function(){
            newli.remove();
        });

        let edtBtn = document.createElement("button");
        edtBtn.innerText = "Edit";
        edtBtn.addEventListener("click", function () {
            if (edtBtn.innerText === "Edit") {
                let currentText = newli.firstChild;
                let input = document.createElement("input");
                input.type = "text";
                input.value = currentText.textContent;
                newli.replaceChild(input, currentText);
                edtBtn.innerText = "Save";
            } else { 
                let input = newli.querySelector("input");
                let updatedText = document.createElement("span"); //q
                updatedText.innerText = input.value;
                newli.replaceChild(updatedText, input);
                edtBtn.innerText = "Edit";
            }
        });

        newli.appendChild(edtBtn);
        document.getElementById("tl").appendChild(newli);
        NewTask.value = "";
    } else {
        document.getElementById("errorMsg").innerText = "Please enter a task!";
    }
});
