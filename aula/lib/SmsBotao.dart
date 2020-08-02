import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class SmsBotao {
  Map<String, dynamic> list;
  SmsBotao(
    this.list,
  );
  Widget botao() {
    return Container(
        margin: EdgeInsets.only(top:10),
        padding: EdgeInsets.fromLTRB(40.0, 0.0, 40.0, 0),
        child: RaisedButton(
            color: Colors.blue[700],
            child: Text(this.list["nome"]),
            onPressed: () {
              sendSms();
            }));
  }

  sendSms() {
    String sms1 = "sms:" + list["numero"];
    launch(sms1);
  }
}
