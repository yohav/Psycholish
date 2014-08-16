function capitalize(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
}


function popup(message){
    navigator.notification.alert(message);
}