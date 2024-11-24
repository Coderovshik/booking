import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 50 },  // Разогрев: 50 пользователей за 30 секунд
    { duration: '1m', target: 100 },  // Нагрузка: 100 пользователей в течение 1 минуты
    { duration: '30s', target: 0 },   // Завершение: снижение до 0 пользователей
  ],
};

const API_URL = 'http://localhost:4000';
const authToken = 'Basic admin:admin';

export default function () {
  const headers = {
    Authorization: authToken,
  };

  // Выполняем GET-запрос с заголовком авторизации
  const res = http.get(`${API_URL}/v1/bookings`, { headers });

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });

  sleep(1);
}