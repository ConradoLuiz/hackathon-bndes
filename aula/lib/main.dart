import 'package:aula/Licao.dart';
import 'package:aula/Mensagem.dart';
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
       
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
   
   
  }

  @override
  Widget build(BuildContext context) {
    
    return Scaffold(
     
      backgroundColor: Colors.blue,
      body:SingleChildScrollView( child: Center(
       
        child: Column(
         

          children: <Widget>[
            Container(
                margin: EdgeInsets.only(
                    left: 0, top: 120.0, right: 0.0, bottom: 0.0),
                child: Text(
                  "Diploma de \n Bolso",
                  style: TextStyle(
                      fontSize: 30,
                      color: Colors.white,
                      fontWeight: FontWeight.bold),
                  textAlign: TextAlign.center,
                )),
            Container(
              margin: EdgeInsets.only(
                  left: 2.0, top: 50.0, right: 6.0, bottom: 100.0),
              width: 150,
              height: 150,
              child: Image.asset('assets/graduation.png'),
            ),
            Container(
              height: 80,
              width: 200,
              child: RaisedButton(
                  onPressed: () {
                     Navigator.push(context, MaterialPageRoute(builder: (conxtet) => Licao()));
                  },
                  child: Center(child: Text("Lição",
                   style: TextStyle(
                      fontSize: 20,
                      color: Colors.white,
                      fontWeight: FontWeight.bold),
                  
                  )),
                  color: Colors.blue[700],
                  shape: new RoundedRectangleBorder(
                      borderRadius: new BorderRadius.circular(25.0))),
            ),
            Container(
              margin: EdgeInsets.only(top: 10.0),
              height: 50,
              width: 200,
              child: RaisedButton(
                  onPressed: () {
                     Navigator.push(context, MaterialPageRoute(builder: (conxtet) => Mensagem()));
                  },
                  child: Center(child: Text("mensagem",
                   style: TextStyle(
                      fontSize: 20,
                      color: Colors.white,
                      fontWeight: FontWeight.bold),
                  
                  )),
                  color: Colors.blue[700],
                  shape: new RoundedRectangleBorder(
                      borderRadius: new BorderRadius.circular(25.0))),
            )
          ],
        ),
      )
      ),
      
    );
  }
}
