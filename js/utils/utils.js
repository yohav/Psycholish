function capitalize(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
}


function popup(message){
    if(navigator.notification){
        navigator.notification.alert(message);
    }
    else
    {
        alert(message);
    }
}