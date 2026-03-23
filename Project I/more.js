const bodyMain = document.querySelector('#bodyMain');
const learnMoreBtn = document.querySelector('#learnMoreBtn');

bodyMain.addEventListener('click', event => {

        if (event.target === learnMoreBtn){

            if (document.querySelector('#messageLearnMore')) return ;
            

            const message = document.createElement('p');
            message.setAttribute('id', 'messageLearnMore')
            message.classList.add('learn-more-content');
            
            message.textContent = "Our Student Management System (StuMaS) simplifies administration by centralizing records and attendance. Featuring seamless database integration, it ensures secure data handling and real-time updates, empowering educators to manage student success within a streamlined digital environment."

            bodyMain.append(message);
        }


})