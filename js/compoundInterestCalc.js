function showOrHideFreq(val, buttonGroup) {
    var buttons = document.getElementById(buttonGroup);
    if (parseInt(val) > 0) {
        buttons.style.display = "block";
    } else {
        buttons.style.display = "none";
    }
}