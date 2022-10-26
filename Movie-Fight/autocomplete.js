const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  root.innerHTML = `
  <label><b>Search</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');

  const onInput = async (event) => {
    const items = await fetchData(event.target.value);

    if (!items.length) {
      dropdown.classList.remove('is-active');
      return;
    }

    dropdown.classList.add('is-active');
    resultsWrapper.innerHTML = '';
    for (let item of items) {
      const option = document.createElement('a');

      option.classList.add('dropdown-item');
      option.innerHTML = renderOption(item);
      resultsWrapper.appendChild(option);
      option.addEventListener('click', () => {
        dropdown.classList.remove('is-active');
        input.value = inputValue(item);
        onOptionSelect(item);
      });
    }
  };

  input.addEventListener('input', debounce(onInput, 500));

  // Events bubble, which means if some element contained inside the document, and if it does not handled, then the event is going to essentially bubble up until it gets to the top level of our entire HTML document. In this case, its document
  document.addEventListener('click', (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove('is-active');
    }
  });
};
