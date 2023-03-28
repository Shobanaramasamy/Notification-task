function useNotifications() {
    const notificationContainer = document.getElementById('notifications');
    const delay = 6000;
    let pausedTime, remainingTime;
    const notifications = [];
    const timeouts = [];
    let timeoutId;
    const colour = {
        'SUCCESS': {
            backgroundColor: '#ACD6A7',
            loadingColor: 'green'
        },
        'ERROR': {
            backgroundColor: '#F59797',
            loadingColor: 'red'
        },
        'INFO': {
            backgroundColor: '#9DADD6',
            loadingColor: 'blue'
        },
        'WARNING': {
            backgroundColor: '#FAF5BD',
            loadingColor: 'Yellow'
        }
    }

    function showNotification(type, message) {

        const notification = document.createElement('div');
        const loader = document.createElement('hr');
        const removeButton = document.createElement('button')
        removeButton.textContent="x"
        notification.classList.add('notification');
        loader.classList.add('loader')
        removeButton.classList.add('remove-button')
        // notification.classList.add(type.toLowerCase());
        notification.textContent = message;
        notificationContainer.appendChild(notification);
        notification.appendChild(loader)
        notification.appendChild(removeButton)
        notifications.push(notification);
        notification.style.backgroundColor = colour[type].backgroundColor
        loader.style.background = colour[type].loadingColor

        removeButton.addEventListener('click',()=>{
            removeNotification(notification);
        })
        // for getting remaining time
        const startTime = Date.now();
    
        timeoutId = setTimeout(() => {
            pauseNotification()
            // removeNotification(notification);
        }, delay);



        // let startTime = Date.now();


        function resumeNotification() {
            timeoutId = setTimeout(() => {
                removeNotification(notification);
            }, remainingTime);
        }


        function pauseNotification() {
            clearTimeout(timeoutId);
            pausedTime = Date.now();
            remainingTime = delay - (pausedTime - startTime);
          }

        notification.addEventListener('mouseenter', () => {
            console.log("###in mouseenter###")
            pauseNotification()
        });

        function removeNotification(notification) {
            const index = notifications.indexOf(notification);
            if (index > -1) {
                notifications.splice(index, 1);
                notification.remove();
            }
        }


      

        notification.addEventListener('mouseleave', () => {
            resumeNotification()
        });
    }


  

    return { showNotification };
}





const { showNotification } = useNotifications();