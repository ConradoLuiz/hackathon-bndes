import 'package:flutter/material.dart';

class MensagemSend extends StatelessWidget {
  String numero;
  TextEditingController controllerNome= TextEditingController();
  MensagemSend( );
  @override
  Widget build(BuildContext context) {
    return Container(child: Container(
          color: Colors.blue[600],
          margin: EdgeInsets.fromLTRB(6.0, 10.0, 0.0, 0.0),
          child:  TextField(
            controller: controllerNome,
            decoration: InputDecoration(
              labelText: 'Nome',
              border: OutlineInputBorder(),
              labelStyle: TextStyle(color: Colors.black)
            )
          ),
          
        ),
      
    );
  }
}