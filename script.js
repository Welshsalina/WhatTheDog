document.addEventListener("DOMContentLoaded", () => {
  console.log("Страница загрузилась");

  // Экраны
  const startScreen = document.getElementById("start-screen");
  const quizScreen = document.getElementById("quiz-screen");
  const resultScreen = document.getElementById("result-screen");
  const startScreenMobile = document.getElementById("start-screen-mobile");
  const quizScreenMobile = document.getElementById("quiz-screen-mobile");
  const resultScreenMobile = document.getElementById("result-screen-mobile");

  // Обновлённый способ — выбираем все кнопки запуска теста
  const startButtons = document.querySelectorAll(".start-button");

  // Вопросы (десктоп)
  const questionCounter = document.getElementById("question-counter");
  const questionText = document.getElementById("question-text");
  const questionImage = document.getElementById("question-image");
  const answerButtons = document.querySelectorAll(".answer-button");

  // Вопросы (мобилка)
  const questionCounterMobile = document.getElementById("question-counter-mobile");
  const questionTextMobile = document.getElementById("question-text-mobile");
  const questionImageMobile = document.getElementById("question-image-mobile");
  const answerButtonsMobile = document.querySelectorAll(".answer-button-mobile");

  // Результаты
  const resultTitle = document.getElementById("result-title");
  const resultBreeds = document.getElementById("result-breeds");
  const resultDescription = document.getElementById("result-description");
  const resultImage = document.getElementById("result-image");
  const resultTitleMobile = document.getElementById("result-title-mobile");
  const resultBreedsMobile = document.getElementById("result-breeds-mobile");
  const resultDescriptionMobile = document.getElementById("result-description-mobile");
  const resultImageMobile = document.getElementById("result-image-mobile");

  let currentQuestionIndex = 0;

  const questions = [
    {
      text: "Сколько времени ты готов гулять с\u00A0собакой?",
      image: "img/question1.png",
      alt: "Иллюстрация к вопросу",
      answers: [
        { text: "Пару минут —\u00A0в тапочках выбежать и\u00A0обратно", groups: ["D"] },
        { text: "Два раза в\u00A0день по\u00A0полчаса, стабильно", groups: ["F", "D"] },
        { text: "Мы с\u00A0ней будем знать по\u00A0именам всех голубей\u00A0на\u00A0районе", groups: ["A", "B", "C"] },
        { text: "А можно без\u00A0расписания? Я\u00A0—\u00A0по\u00A0настроению", groups: ["E", "F"] }
      ]
    },
    {
      text: "Где ты живёшь?",
      image: "img/question2.png",
      alt: "Иллюстрация к вопросу",
      answers: [
        { text: "В крошечной квартире, где\u00A0даже собака — это\u00A0уже сосед", groups: ["D", "E"] },
        { text: "В типовой квартире, соседи норм, но\u00A0стены\u00A0тонкие", groups: ["F", "D"] },
        { text: "В просторной квартире или\u00A0таунхаусе, есть\u00A0место побегать", groups: ["B", "C"] },
        { text: "В частном доме с\u00A0участком — пусть бегает, сколько хочет", groups: ["A", "C"] }
      ]
    },
    {
      text: "Ты хочешь собаку, чтобы…",
      image: "img/question3.png",
      alt: "Иллюстрация к вопросу",
      answers: [
        { text: "Вместе лежать на\u00A0диване", groups: ["F", "B"] },
        { text: "Ходить на\u00A0прогулки и\u00A0тусить с\u00A0собачниками", groups: ["B", "D"] },
        { text: "Брать её в\u00A0приключения", groups: ["A", "C"] },
        { text: "Не знаю, просто очень хочу. Я\u00A0разберусь,\u00A0когда\u00A0заведу", groups: ["E", "F"] }
      ]
    },
    {
      text: "Как ты относишься к\u00A0шерсти в\u00A0доме?",
      image: "img/question4.png",
      alt: "Иллюстрация к вопросу 4",
      answers: [
        { text: "Лучше без\u00A0неё. Мой пылесос и\u00A0так\u00A0уволился", groups: ["D", "E"] },
        { text: "Немного — не\u00A0страшно, справлюсь", groups: ["B", "F"] },
        { text: "Мне всё равно, главное — чтобы\u00A0собака была\u00A0классная", groups: ["A", "C"] },
        { text: "А что, у\u00A0меня всё\u00A0равно везде шерсть от\u00A0моих свитеров — собака ничего не\u00A0изменит", groups: ["A", "B", "C", "F"] }
      ]
    },
    {
      text: "Что тебе важнее в\u00A0собаке?",
      image: "img/question5.png",
      alt: "Иллюстрация к вопросу 5",
      answers: [
        { text: "Чтобы была мягкой и\u00A0домашней, с\u00A0ней можно было вместе валяться на\u00A0диване", groups: ["F", "B"] },
        { text: "Чтобы была компактной", groups: ["D", "E"] },
        { text: "Чтобы была доброй и\u00A0открытой, сразу шла на\u00A0контакт с\u00A0людьми и\u00A0животными", groups: ["B", "A"] },
        { text: "Чтобы была умной и\u00A0самостоятельной", groups: ["E", "C"] }
      ]
    },
    {
      text: "Кто ты по\u00A0вайбу?",
      image: "img/question6.png",
      alt: "Иллюстрация к вопросу 6",
      answers: [
        { text: "Интроверт. Ценю тишину и\u00A0личное\u00A0пространство", groups: ["E", "F"] },
        { text: "Общаюсь с\u00A0радостью, но\u00A0и\u00A0тишину ценю", groups: ["B", "D"] },
        { text: "Я шум, движ и\u00A0счастье — дайте\u00A0мне\u00A0мячик!", groups: ["C", "A"] },
        { text: "Мой вайб зависит от\u00A0дня недели и\u00A0количества\u00A0сна", groups: ["D", "F"] }
      ]
    },
    {
      text: "Какая собака тебе ближе по\u00A0размеру?",
      image: "img/question7.png",
      alt: "Иллюстрация к вопросу 7",
      answers: [
        { text: "Маленькую, чтобы брать с\u00A0собой\u00A0везде", groups: ["D"] },
        { text: "Средняя — чтобы можно было обнять, но\u00A0не\u00A0уронить", groups: ["B", "F", "E"] },
        { text: "Большая! Хочу медведя, который храпит и\u00A0согревает ноги", groups: ["A", "C"] },
        { text: "Размер не\u00A0главное — главное, чтобы\u00A0мы совпали по\u00A0вайбу", groups: ["A", "B", "C", "D", "E", "F"] }
      ]
    },
    {
      text: "Часто ли ты куда-то пропадаешь?",
      image: "img/question8.png",
      alt: "Иллюстрация к вопросу 8",
      answers: [
        { text: "Я почти всегда дома. Я\u00A0и собака — как\u00A0хвост\u00A0и\u00A0попа", groups: ["F", "A"] },
        { text: "Иногда уезжаю, но\u00A0могу оставить собаку с\u00A0друзьями или\u00A0родителями", groups: ["B", "D"] },
        { text: "Уезжаю довольно часто, важно, чтобы\u00A0собака могла спокойно быть одна", groups: ["E", "C"] },
        { text: "График хаотичный: то\u00A0в\u00A0разъездах, то\u00A0дома\u00A0неделями", groups: ["C", "E", "D"] }
      ]
    },
    {
      text: "Насколько тебе важен контакт с\u00A0собакой?",
      image: "img/question9.png",
      alt: "Иллюстрация к вопросу 9",
      answers: [
        { text: "Мне нужно личное пространство — пусть\u00A0ходит где-то рядом, но\u00A0не\u00A0пристаёт", groups: ["E", "D"] },
        { text: "Хочу общения, но\u00A0не\u00A024/7", groups: ["B", "A"] },
        { text: "Хочу, чтобы она была как\u00A0вайфай — везде, стабильно и\u00A0без\u00A0перебоев", groups: ["F", "C"] },
        { text: "Всё зависит\u00A0от моего настроения. Сегодня я интроверт, завтра — обнимашки", groups: ["D", "F", "E"] }
      ]
    },
    {
      text: "Как ты относишься к\u00A0собачьему лаю?",
      image: "img/question10.png",
      alt: "Иллюстрация к вопросу 10",
      answers: [
        { text: "Лай — это прекрасно, если\u00A0его\u00A0нет", groups: ["E"] },
        { text: "Немного лая — нормально", groups: ["B", "F"] },
        { text: "Пусть лает, живём один раз", groups: ["A", "C", "D"] },
        { text: "Я могу лаять с\u00A0ней\u00A0в унисон — мы\u00A0одна\u00A0стая", groups: ["C", "D", "F"] }
      ]
    }    
  ];

  const groupResults = {
    A: {
      title: "Большие и надёжные",
      breeds: "Лабрадор, бернский зенненхунд, сенбернар, золотистый ретривер, ньюфаундленд и другие",
      description:
        "Эти собаки — добрые великаны с\u00A0золотым сердцем. Они обожают людей, особенно детей, и\u00A0готовы быть рядом в\u00A0любой момент. Им\u00A0важно быть частью семьи.\n\nДа, шерсти будет много, а\u00A0диван — занят. Но\u00A0зато\u00A0у\u00A0тебя всегда будет тёплая спина, пушистый охранник и\u00A0настоящая поддержка рядом.\n\nЕсли ты\u00A0про\u00A0душевную связь — эта\u00A0порода для\u00A0тебя 🐶\u00A0🛡",
      image: "img/result_A.png",
    },
    B: {
      title: "Дружелюбные компаньоны",
      breeds: "Корги, бигль, кокер-спаниель, золотистый ретривер, лабрадор ретривер и другие",
      description:
        "Эти собаки — как\u00A0лучшие друзья: всегда рядом, всегда готовы поиграть, пообниматься и\u00A0составить компанию. Они\u00A0не\u00A0любят одиночество, зато отлично ладят с\u00A0людьми и\u00A0другими животными.\n\nИдеальны для\u00A0тех, кто\u00A0ценит активность, лёгкость и\u00A0настоящую эмоциональную связь. Гулять, общаться, лежать на\u00A0диване — всё\u00A0вместе, всё\u00A0с\u00A0хвостиком 🤗\u00A0🐾",
      image: "img/result_B.png",
    },
    C: {
      title: "Активные авантюристы",
      breeds: "Бордер-колли, далматин, сибирский хаски, аляскинский маламут, австралийская овчарка и другие",
      description:
        "Горы, велосипеды, километры на\u00A0шагомере — этим\u00A0собакам подавай актив! Они не\u00A0лежат на\u00A0диване — они\u00A0двигают мир. Подойдут тем, кто\u00A0ищет не\u00A0просто питомца, а\u00A0компаньона по\u00A0приключениям.\n\nУмные и\u00A0отзывчивые, они\u00A0требуют физической и\u00A0умственной загрузки. Если\u00A0хочешь жить весело и\u00A0в\u00A0движении — эта\u00A0собака ждёт тебя 🤗\u00A0🐾",
      image: "img/result_C.png",
    },
    D: {
      title: "Компактные с характером",
      breeds: "Чихуахуа, йоркширский терьер, померанский шпиц, той-фокстерьер, китайская хохлатая и другие",
      description:
        "Маленькие, но\u00A0с\u00A0огромным сердцем — эти\u00A0породы идеально подойдут тем, кто\u00A0ищет собаку-компаньона, но\u00A0при\u00A0этом не\u00A0готов к\u00A0крупным размерам и\u00A0бесконечным прогулкам.\n\nОни энергичны, умны, обожают внимание и\u00A0быстро учатся. А\u00A0ещё\u00A0их\u00A0можно брать в\u00A0путешествия, кафе и\u00A0даже\u00A0на\u00A0работу.\n\nЕсли тебе важны мобильность, общение и\u00A0характер с\u00A0перчинкой — эта\u00A0группа\u00A0твоя 🐶\u00A0🔥",
      image: "img/result_D.png",
    },
    E: {
      title: "Умные интроверты",
      breeds: "Шиба-ину, басенджи, миниатюрный пудель, акита-ину, китайская хохлатая и другие",
      description:
        "Эти собаки — с\u00A0характером. Независимые, умные, наблюдательные. Они\u00A0не\u00A0будут бегать за\u00A0тобой по\u00A0пятам, но\u00A0всегда будут рядом, когда\u00A0ты\u00A0действительно нужен. Им\u00A0важно уважение и\u00A0пространство.\n\nПодходят тем, кто\u00A0ценит тишину, лёгкий контроль и\u00A0глубокую, но\u00A0ненавязчивую связь. Настоящие пушистые интроверты — с\u00A0умом\u00A0и\u00A0грацией 🐶\u00A0🧠",
      image: "img/result_E.png",
    },
    F: {
      title: "Уютные диваногрелки",
      breeds: "Мопс, французский бульдог, кавалер-кинг-чарльз спаниель, ши-тцу, пекинес и другие",
      description:
        "Эти хвостики не\u00A0станут тянуть тебя в\u00A0поход — скорее, предложат пораньше лечь спать. Отлично чувствуют настроение хозяина, легко адаптируются и\u00A0не\u00A0требуют километров по\u00A0парку.\n\nПодходят тем, кто\u00A0хочет нежного и\u00A0ненавязчивого друга рядом. Идеальны для\u00A0небольших квартир, размеренного ритма и\u00A0обнимашек без\u00A0спешки 😴\u00A0🐶",
      image: "img/result_F.png",
    },
  };

  const groupScores = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };

  const isMobile = () => window.innerWidth <= 768;

  const renderQuestion = (index) => {
    const q = questions[index];
    if (isMobile()) {
      questionTextMobile.textContent = q.text;
      questionCounterMobile.textContent = `Вопрос ${index + 1}/${questions.length}`;
      questionImageMobile.src = q.image;
      questionImageMobile.alt = q.alt;
      answerButtonsMobile.forEach((btn, i) => {
        btn.textContent = q.answers[i].text;
        btn.dataset.groups = q.answers[i].groups.join(",");
      });
    } else {
      questionText.textContent = q.text;
      questionCounter.textContent = `Вопрос ${index + 1}/${questions.length}`;
      questionImage.src = q.image;
      questionImage.alt = q.alt;
      answerButtons.forEach((btn, i) => {
        btn.textContent = q.answers[i].text;
        btn.dataset.groups = q.answers[i].groups.join(",");
      });
    }
  };

  const handleAnswer = (groups) => {
    groups.forEach((group) => groupScores[group]++);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      renderQuestion(currentQuestionIndex);
    } else {
      quizScreen.style.display = "none";
      quizScreenMobile.style.display = "none";

      const topGroup = Object.entries(groupScores).sort((a, b) => b[1] - a[1])[0][0];
      const result = groupResults[topGroup];

      if (isMobile()) {
        resultTitleMobile.textContent = result.title;
        resultBreedsMobile.textContent = result.breeds;
        resultDescriptionMobile.textContent = result.description;
        resultImageMobile.src = result.image;
        resultImageMobile.alt = result.alt;
        resultScreenMobile.style.display = "block";
      } else {
        resultTitle.textContent = result.title;
        resultBreeds.textContent = result.breeds;
        resultDescription.textContent = result.description;
        resultImage.src = result.image;
        resultImage.alt = result.alt;
        resultScreen.style.display = "block";
      }
    }
  };

  const handleStart = () => {
    document.body.classList.add("quiz-started");
    startScreen.style.display = "none";
    startScreenMobile.style.display = "none";
    resultScreen.style.display = "none";
    resultScreenMobile.style.display = "none";
  
    if (isMobile()) {
      quizScreenMobile.style.display = "block";
    } else {
      quizScreen.style.display = "block";
    }
  
    currentQuestionIndex = 0;
    Object.keys(groupScores).forEach((key) => (groupScores[key] = 0));
  
    renderQuestion(currentQuestionIndex); // 
  };

  // Назначаем обработчик на обе кнопки старта
  startButtons.forEach((btn) => {
    btn.addEventListener("click", handleStart);
  });

  // Назначаем обработчики на кнопки ответов
  answerButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.add("selected");
      const groups = btn.dataset.groups.split(",");
      setTimeout(() => {
        handleAnswer(groups);
        btn.classList.remove("selected");
      }, 400);
    });
  });

  answerButtonsMobile.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.add("selected"); // подсвечиваем выбранную кнопку
      const groups = btn.dataset.groups.split(",");
      setTimeout(() => {
        handleAnswer(groups);       // запускаем обработку после 0.4 сек
        btn.classList.remove("selected"); // убираем подсветку (опционально)
      }, 400);
    });
  });
});
