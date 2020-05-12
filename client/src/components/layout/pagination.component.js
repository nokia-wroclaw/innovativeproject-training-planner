import React, {useState, useEffect} from 'react';

const Pagination = (props) => {
  const [amount, setAmount] = useState(1);
  let i;

  useEffect(() => {
    let tabsAmount = Math.floor(props.elemsAmount / props.elemsPerPage);
    if (props.elemsAmount % props.elemsPerPage !== 0) tabsAmount += 1;
    setAmount(tabsAmount);
  }, [props.elemsAmount, props.elemsPerPage, amount]);

  const tabClass = (tabNo) => {
    if (tabNo === props.activeTab) return 'active primary-color';
    else return '';
  };

  const prevTab = () => {
    if (props.activeTab !== 1) {
      props.changeTab((prev) => prev - 1);
      window.scroll(0, 0);
    }
  };

  const nextTab = () => {
    if (props.activeTab !== amount) {
      props.changeTab((prev) => prev + 1);
      window.scroll(0, 0);
    }
  };
  const clickedTab = (event) => {
    props.changeTab(Number(event.target.id));
    window.scroll(0, 0);
  };

  const ShowTabs = () => {
    const tabs = [];
    for (i = 1; i <= amount; i++) {
      tabs.push(
          <li className={tabClass(i)}>
            <a id={i} href="#!" onClick={clickedTab}>
              {i}
            </a>
          </li>,
      );
    }
    return tabs;
  };

  return (
    <div>
      <ul className="pagination">
        <li>
          <a href="#!" onClick={prevTab}>
            <i className="material-icons">chevron_left</i>
          </a>
        </li>
        <ShowTabs />
        <li>
          <a href="#!" onClick={nextTab}>
            <i className="material-icons">chevron_right</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
