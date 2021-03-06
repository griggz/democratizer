export default function validate(values) {
  let errors = {};
  let validStart = ['https', 'http', 'www.'];
  let validSites = ['yelp.com', 'indeed.com'];
  const linkType = validStart.map((x, index) => {
    return values.link.startsWith(x);
  });

  if (!values.link) {
    errors.link = 'Link address is required';
  } else if (!linkType.includes(true)) {
    errors.link = 'Address must be a valid link and begin with http, https or www.';
  } else if (!validSites.some(el => values.link.includes(el))) {
    errors.link = 'Address is not a valid yelp or indeed link';
  }
  if (parseInt(values.page_amount) > 100 && (!values.page_amount === undefined)) {
    errors.push("Number of pages must be less than 100. I didn't think there were business with more than 100 pages of reviews. If you find one, let me know I'll adjust the code.");
  }
  return errors;
};
