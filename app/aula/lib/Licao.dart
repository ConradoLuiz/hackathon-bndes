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
        
        title: Text("pocha"),
      ),
      body: Center(
       
        child: Column(
         
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Botao().showBotao(),
            
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.display1,
            ),
          ],
        ),
      ),
     
    );
  }
}
