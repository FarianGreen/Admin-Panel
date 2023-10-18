import { TRegisterType } from "../data-types/types";
import { ModeratorModel } from "../pages/add-moder/moderator-model";
import { RegisterModel } from "../pages/register/register-model";
const _baseUrl = "http://localhost:3001/";
const suggestionsUrl = `${_baseUrl}suggestions/`;
const systemMessagesUrl = `${_baseUrl}systemMessages`;
const moderatorsUrl = `${_baseUrl}moderators/`;
const registrationsUrl = `${_baseUrl}register/`;
const loginUrl = `${_baseUrl}login/`;

export async function getSuggestions() {
  return fetch(suggestionsUrl, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
}

export async function systemMessages() {
  return fetch(systemMessagesUrl, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
}

export async function fetchToggleStatus(id: number, value: string) {
  return fetch(`${suggestionsUrl}${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: value,
    }),
  });
}

export async function getModerators() {
  return fetch(moderatorsUrl);
}

export async function fetchToggleModerator(id: number, value: string) {
  return fetch(`${moderatorsUrl}${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      current: value,
    }),
  });
}

export async function fetchMessageToModer(
  id: number | null,
  theme: string,
  message: string
) {
  return fetch(`${moderatorsUrl}${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      theme,
      message,
    }),
  });
}

export async function fetchAddNewModer(name: string) {
  return fetch(moderatorsUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(new ModeratorModel(name)),
  });
}
export async function registerNewUser({
  login,
  email,
  password,
}: TRegisterType) {
  return fetch(registrationsUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(new RegisterModel(login, email, password)),
  });
}
export async function checkAutorization(user: object) {
  return fetch(loginUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
}
