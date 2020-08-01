import 'package:aula/SalaDeAula.dart';
import 'package:flutter/material.dart';

class Botao {

  BuildContext context;
  Botao(BuildContext context) {
    this.context = context;
  }

  Widget showBotao() {
    return Container(
      padding: EdgeInsets.only(left: 6.0, top: 15.0, right: 6.0, bottom: 15.0),
      height: 120,
      width: 120,
      child: RaisedButton(
          onPressed: () {
            Navigator.push(
                context, MaterialPageRoute(builder: (conxtet) => SalaDeAula()));
          },
          child: Center(child: Text("Lição")),
          color: Colors.blue[700],
          shape: new RoundedRectangleBorder(
              borderRadius: new BorderRadius.circular(25.0))),
    );
  }
}
