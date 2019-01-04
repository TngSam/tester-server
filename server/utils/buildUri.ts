/**
 * Function for building URI from base url and options
 * @param url - Base URL
 * @param options - Query options
 * @returns {string}
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
const buildURI = (url: string, options: any): string => {
  let copy: string | string[] = url;
  if (Object.keys(url).length) {
    copy += '?';
    for (const option in options) {
      copy += `${option}=${encodeURIComponent(options[option])}&`;
    }
  }

  copy = copy.split('');
  copy.pop();
  copy = copy.join('');

  return <string>copy;
}

export default buildURI;
