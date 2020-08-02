import 'package:aula/Botao.dart';
import 'package:flutter/material.dart';

class Licao extends StatefulWidget {
  Licao({Key key}) : super(key: key);

  @override
  _LicaoState createState() => _LicaoState();
}

class _LicaoState extends State<Licao> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blue[700],
        title:Row(mainAxisAlignment: MainAxisAlignment.center,children:[ Text("Diploma de Bolso"),Container(width: 30,height: 30 , margin: EdgeInsets.only(left: 6.0,right: 45.0),child: Image.asset('assets/graduation.png'),)]),


      ),
      backgroundColor: Colors.blue,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Container(
                child: Flexible(
              child: ListView.builder(
                  padding: EdgeInsets.only(top: 10.0),
                  itemCount: 5,
                  itemBuilder: (BuildContext context, int index) {
                    return Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Botao(context,2*index).showBotao(),
                          Botao(context,(2*index)+1).showBotao()
                        ]);
                  }),
            ))
          ],
        ),
      ),
    );
  }
}
