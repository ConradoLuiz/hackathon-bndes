import 'package:flutter/material.dart';

class Botao {
  Botao() {}

  Widget showBotao() {
    return Container(
      height: 100,
      width: 100,
      child: RaisedButton(
        onPressed: () {
          print("estou aqui");
        },
        color: Colors.blue,
      ),
    );
  }
}
