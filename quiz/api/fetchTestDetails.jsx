const fetchTestDetails = async (testID) => {
    try {
      const response = await fetch(`https://tgryl.pl/quiz/test/${testID}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Błąd podczas pobierania szczegółów testu:', error);
      return null;
    }
  };
  
  export default fetchTestDetails;
  