const App = () => {
  const categories = [
    { id: 1, title: 'Hats' },
    { id: 2, title: 'Jackets' },
    { id: 3, title: 'Sneakers' },
    { id: 4, title: 'Women' },
    { id: 5, title: 'Men' },
  ];

  return (
    <div className='categories-container'>
      {categories.map((category) => {
        return (
          <div className='category-container' key={category.id}>
            <div className='background-image' />
            <div className='category-body-container'>
              <h2>{category.title}</h2>
              <p>Shop Now</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
