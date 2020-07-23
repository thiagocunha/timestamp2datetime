// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
    String.prototype.format = function() {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
        ;
      });
    };
  }

chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => { /* Code Here */ 
    var elements = document.getElementsByTagName('*');

    const dateTimeFormat = new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit', year: '2-digit', month: 'short', day: '2-digit' }) 
    
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];

            if (node.nodeType === 3) {
                var text = node.nodeValue;
                var replacedText = text.replace(/\d{9,10}/g, (match, $1) => {
                    let d = new Date(match*1000);
                    let [{ value: month },,{ value: day },,{ value: year },,{value: hour},,{value: minute}] = dateTimeFormat.formatToParts(d ) 

                    return '{0}:{1} {2}-{3}-{4}'.format(hour, minute, day, month, year);;

                });
                
                if (replacedText !== text) {
                    element.replaceChild(document.createTextNode(replacedText), node);
                }
            }
        }
    }

} );
