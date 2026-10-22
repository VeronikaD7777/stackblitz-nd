export function isString(data) {
  return typeof data === 'string';
}

export function isNumber(data) {
  return typeof data === 'number';
}

export function isEmpty(data) {
  return (
    data === undefined ||
    data === null ||
    JSON.stringify(data) === '{}' ||
    data === ''
  );
}

export function isNotEmpty(data) {
  return !isEmpty(data);
  //return (data !== undefined || data !== null || JSON.stringify(data) !== '{}' || data !== '');
}

export function isNotEmptyArray(data) {
  return Array.isArray(data) && data.length !== 0;
}

export function isCorrectStatus(enums, status) {
  return Object.values(enums).includes(status);
}
