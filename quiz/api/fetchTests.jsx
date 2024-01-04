const fetchTests = async () => {
    try {
      const response = await fetch('https://tgryl.pl/quiz/tests');
      const data = await response.json();
      return data;
    } catch (error) {
   
      return [];
    }
  };
  
  export default fetchTests;