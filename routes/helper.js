module.exports = {
	getTimeString: function(timestamp){
    let datetime = new Date(timestamp)

    const months = ["Jan", "Feb", "Mar","Apr", "May", 
    "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    // DD MM YYYY
    return datetime.getDate() + " " 
    + months[datetime.getMonth()] + " "
    + datetime.getFullYear()

  }
}