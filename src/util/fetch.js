import fetch from "node-fetch";

/**
 * @function customFetch
 * @desc fetch(특히 fetch의 반환 데이터)를 사용하기 편하게 한 번 감쌌습니다.
 * @param {string} url fetch 요청을 보내고 싶은 주소를 입력합니다.
 * @param {string} method http 요청 방식을 입력합니다. 'GET', 'POST', 'PUT', 'DELETE' 등이 있습니다.
 * @param {string} mode fetch 요청을 보낼 때 mode를 설정할 수 있습니다. 'cors', 'no-cors', '*same-origin' 등이 있습니다.
 * @return {object} 해당 url로 fetch요청을 보낸 다음, json으로 변환시킨 결과를 반홥합니다.
 */
export const customFetch = async (url, method = "GET", mode = "cors") => {
  const response = await fetch(url, { method, mode });
  const json = await response.json();
  return json;
};
