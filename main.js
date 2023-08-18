const paragraphs = [
  "Personality development encompasses the dynamic construction and deconstruction of integrative characteristics that distinguish an individual in terms of interpersonal behavioral traits. Personality development is ever-changing and subject to contextual factors and life-altering experiences. Personality development is also dimensional in description and subjective in nature. That is, personality development can be seen as a continuum varying in degrees of intensity and change. It is subjective in nature because its conceptualization is rooted in social norms of expected behavior, self-expression, and personal growth." ,
  "Artificial Intelligence (AI) is a rapidly advancing field that focuses on developing intelligent machines capable of simulating human intelligence. AI technologies, such as machine learning and natural language processing, have applications in various industries, including healthcare, finance, and transportation. AI systems can analyze large amounts of data, make predictions, and automate tasks, leading to increased efficiency and innovation. However, ethical concerns surrounding AI, such as privacy and job displacement, must be addressed to ensure responsible and beneficial implementation.",
  "Climate change refers to long-term shifts in weather patterns and global temperatures, primarily caused by human activities, such as burning fossil fuels and deforestation. It poses significant challenges to ecosystems, economies, and human well-being. Rising temperatures, sea-level rise, and extreme weather events are some of the impacts of climate change. Addressing climate change requires global cooperation and immediate action. This includes transitioning to renewable energy sources, reducing greenhouse gas emissions, and adopting sustainable practices in sectors like agriculture and transportation.",
  "Space exploration is the scientific discovery and exploration of celestial objects beyond Earth's atmosphere. It encompasses activities such as launching satellites, conducting experiments on the International Space Station, and sending robotic probes to distant planets and asteroids. Space exploration has provided valuable knowledge about our universe, including insights into the formation of stars and galaxies. Moreover, it has spurred technological advancements and inspired generations to pursue careers in science and engineering. Ongoing efforts in space exploration aim to further understand the origins of the universe, search for signs of extraterrestrial life, and develop capabilities for crewed missions to other planets.",
  "Mental health encompasses a person's emotional, psychological, and social well-being. Mental health conditions, such as depression, anxiety, and bipolar disorder, affect millions of people worldwide. It is crucial to prioritize mental health and ensure access to proper care and support. Promoting mental well-being involves reducing stigma, increasing awareness, and providing resources for early intervention and treatment. Additionally, creating supportive environments, such as workplaces and schools, can contribute to positive mental health outcomes. Investing in mental health services and research is vital for improving the overall well-being of individuals and communities.",
  "Gender equality is the principle that all individuals, regardless of their gender, should have equal rights, opportunities, and treatment. Achieving gender equality is crucial for promoting social justice, economic development, and peace. It involves challenging and changing societal norms, attitudes, and structures that perpetuate discrimination and gender-based violence. Efforts towards gender equality include ensuring equal access to education and healthcare, addressing gender pay gaps, promoting women's empowerment, and encouraging men's involvement in caregiving and domestic responsibilities. Implementing gender-responsive policies and fostering inclusive societies are vital steps in creating a more equitable and prosperous world.",
  "Cybersecurity refers to the protection of computer systems, networks, and data from unauthorized access, damage, or theft. In today's digital age, where data breaches and cyberattacks are prevalent, ensuring robust cybersecurity measures is crucial. Cyber threats can disrupt businesses, compromise personal information, and even impact national security. Enhancing cybersecurity involves implementing preventive measures, such as strong passwords, encryption, and firewalls. Regular software updates, employee training, and incident response plans are also important. Collaboration between governments, organizations, and individuals is essential to address evolving cyber threats and stay ahead of malicious actors.",
  "Globalization is the process of increasing interconnectedness and interdependence among countries through the exchange of goods, services, ideas, and information. It has been facilitated by advancements in transportation, communication, and technology. Globalization has led to increased trade, economic integration, and cultural exchange. It has created new opportunities for businesses, expanded consumer choices, and fostered international cooperation. However, globalization has also raised concerns about inequality, job displacement, and the exploitation of resources. Balancing the benefits and challenges of globalization requires effective governance, sustainable development practices, and efforts to ensure inclusivity and fair distribution of its advantages.",
  "Scolding is something common in student life. Being a naughty boy, I am always scolded by my parents. But one day I was severely scolded by my English teacher. She infect teaches well. But that day, I could not resist the temptation that an adventure of Nancy Drew offered. While she was teaching, I was completely engrossed in reading that book. Nancy Drew was caught in the trap laid by some smugglers and it was then when I felt a light tap on my bent head. The teacher had caught me red handed. She scolded me then and there and insulted me in front of the whole class. I was embarrassed. My cheeks burned being guilty conscious. ",
  "Days are not of equal value in one’s life. Some bring happiness while others bring sadness. Sadness and happiness both are equally important to man’s life, since they are the two sides of a coin. As we cannot forget the happiest day, we are unable to forget the saddest day of our life too. The saddest day of my life was the Diwali Day. Diwali is considered to be a happy festival and till last Diwali, it was my favorite festival. On last Diwali, my sister, my brother and I were busy lighting the fireworks. I was holding a ‘fuljhari’ in my hand and unfortunately my younger brother, who was standing just beside me, had a cracker in his hand. ",
  "Recently, an exhibition ‘Building A New India’ was held in the capital. It was organized by the Ministry of Information and Broadcasting, Government of India. The exhibition was set up in the Triveni Kala Sangam. The chief exhibits were photographs, novels, some sculptures by Indian modern artists presenting Indian cultural inheritance. First of all, I visited the general section of the exhibition where different charts and photographs depicting India’s development in various fields were set. Most impressive photographs among these were those showing India’s nuclear development. The second section dealt with India’s magnificent historical background. "
]

const typingTag = document.querySelector(".typing-box p"), // paragraph
mistakeTag = document.querySelector(".mistakes span"),
timerTag = document.querySelector(".timer span b"), // time 
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
btn = document.querySelector(".details button")
inputField = document.querySelector(".input-field"); //takes user's input

let timer,
maxTime = 60,
timeLeft = maxTime;

let charIndex = mistakes = isTyping = 0;

function randomParagraph() {
  let randomIndex = Math.floor(Math.random() * paragraphs.length) // creates a random number and select a random paragraph
  // typingTag.innerHTML = "";
  
  paragraphs[randomIndex].split("").map(span => {
    let spanTag = `<span>${span}</span>` //word by word characters 
    typingTag.innerHTML += spanTag
  })

  typingTag.querySelectorAll("span")[0].classList.add("active")
  document.addEventListener("keydown", () => inputField.focus())
  typingTag.addEventListener("click", () => inputField.focus())
}

randomParagraph();

inputField.addEventListener("input", initTyping);
btn.addEventListener("click", resetGame)

function initTyping() {
  const chars = typingTag.querySelectorAll("span");
  let typedChar = inputField.value.split("")[charIndex];

  // check if the paragraph is end or the time is end
  if (charIndex < chars.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    
    // check if pressing backspace to reset the characters
    if (typedChar == null) {
      charIndex--;

      // check if the character contains incorrect class to decrease the misktakes
      if(chars[charIndex].classList.contains("incorrect")) {
        mistakes--;
      }

      chars[charIndex].classList.remove("correct", "incorrect")
    }else {
      // check if the typed character match the current character or not
      if (chars[charIndex].innerText === typedChar) {
        chars[charIndex].classList.add("correct")
      } else {
        mistakes++;
        chars[charIndex].classList.add("incorrect")
    
      }
      charIndex++;
    }
    // add active class to the current character
    chars.forEach(span => span.classList.remove("active"))
    chars[charIndex].classList.add("active")

    // claculate the mistakes, cpm and wpm
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = charIndex - mistakes;
    let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
    // check if the wpm value is less than zero or null or infinity
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    wpmTag.innerText = wpm;
  } else {
    // reset the input and time
    inputField.value = "";
    clearInterval(timer)
  }
}

function initTimer() {
  // count down until timer reach zero 
  if(timeLeft==0) alert("Hey! your correct word per minutes are " +Math.round( charIndex - mistakes) + " and wrong words per minute are "+mistakes);
  if (timeLeft > 0) {
    timeLeft--;
    timerTag.innerText = timeLeft
  } else {
    clearInterval(timer)
  }
}

function resetGame() {
  // reset all value to start again
  randomParagraph()
  inputField.value = "";
  clearInterval(timer)

  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;

  cpmTag.innerText = charIndex - mistakes;
  timerTag.innerText = timeLeft
  mistakeTag.innerText = 0;
  wpmTag.innerText = 0;
}
