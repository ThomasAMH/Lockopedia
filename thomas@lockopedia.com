* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1 {
  padding: 20px 10px;
  border: 1px solid;
  font-family: "Georgia";
  font-size: 22px;
  text-align: center;
}

h2 {
  padding: 20px 10px;
  font-family: "Georgia"
  font-size: 18px;
}

h3 {
  padding: 20px 10px;
  font-family: "Georgia"
  font-size: 16px;
}

p {
  font-family: "Segoe UI"
  font-size: 12px;
  padding: 20px 20px;
}


ul {
  list-style-type: circle;
}

ol {
  list-style-type: decimal;
}

.title-box {
  padding: 20px;
  border: 2px solid;
  box-sizing: border-box;
}

.quick-stats {
    width: 394px;
    padding: 15px;
}

/*
div {
  color: #FFF;
  background-color: #5995DA;
  font-weight: bold;
  padding: 20px;
  text-align: center;
  border: 2px solid #5D6063;
  border-radius: 5px;
  width: 200px;
  box-sizing: border-box;
  margin: 20px auto;
}
*/

/*FIXME Kill me and replace me with a class*/
#random-bold-text {
    font-weight:bold;
}
