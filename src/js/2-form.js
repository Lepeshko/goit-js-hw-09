const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// Ініціалізуємо formData з порожніми рядками
let formData = {
  email: '',
  message: ''
};

// Функція для збереження даних у локальне сховище
const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Функція для завантаження даних з локального сховища
const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Відновлюємо дані з локального сховища при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
  const savedData = loadFromLocalStorage(STORAGE_KEY);
  if (savedData) {
    formData = savedData;
    form.elements.email.value = formData.email || '';
    form.elements.message.value = formData.message || '';
  }
});

// Слухач подій для обробки введення даних у форму
form.addEventListener('input', (event) => {
  const { name, value } = event.target;
  formData[name] = value.trim();
  saveToLocalStorage(STORAGE_KEY, formData);
});

// Слухач подій для обробки відправки форми
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Перевірка, чи заповнені обидва поля форми
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Form data:', formData);

  // Очищення локального сховища, об'єкта formData та полів форми
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});
