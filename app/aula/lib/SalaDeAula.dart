import 'package:aula/Licao.dart';
import 'package:flutter/material.dart';

class SalaDeAula extends StatefulWidget {
  SalaDeAula({Key key}) : super(key: key);

  @override
  _SalaDeAulaState createState() => _SalaDeAulaState();
}

class _SalaDeAulaState extends State<SalaDeAula> {
  int _counter = 0;
  
  void _incrementCounter() {
    /*setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      _counter++;
    });*/
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title:Row(mainAxisAlignment: MainAxisAlignment.center,children:[ Text("Diploma de Bolso"),Container(width: 30,height: 30 , margin: EdgeInsets.only(left: 6.0,right: 45.0),child: Image.asset('assets/graduation.png'),)]),

        backgroundColor: Colors.blue[700],
        
      ),
      backgroundColor: Colors.blue,
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text("Sus orígenes pueden tener motivos de diversa índole, un cambio tecnológico, un cambio social o un nuevo paradigma basta para que una sociedad cambie radicalmente su estructura y gobierno. Las revoluciones pueden ser pacíficas aunque en general implican violencia, al enfrentarse grupos conservadores con el anterior régimen y aquellos que aspiran al cambio, o incluso entre los que aspiran a un nuevo sistema, pudiendo haber así varias facciones enfrentadas. En la actualidad las revoluciones son consideradas los puntos de inflexión de la historia, de los que parten la mayoría de sistemas políticos y sociales actuales. Revoluciones decisivas en la historia mundial serían Revolución de las Trece Colonias, la Revolución francesa, las revoluciones independentistas de Latinoamérica o la Revolución de Octubre."),

          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
