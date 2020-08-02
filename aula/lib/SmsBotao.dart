import 'package:aula/Mensagem.dart';
import 'package:aula/MensagemSend.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:sms/sms.dart';

class SmsBotao {
  List<TextEditingController> controller;
  Map<String,dynamic> list;
  String mensagem;

  SmsBotao(
    this.list,this.controller
  );
  // widget botao da lista de contatos
  Widget botao() {
    return Container(
        margin: EdgeInsets.only(top:10),
        padding: EdgeInsets.fromLTRB(40.0, 0.0, 40.0, 0),
        child: RaisedButton(
            color: Colors.blue[700],
            child: Text(this.list["nome"]),
            onPressed: () {
              this.mensagem=this.controller[2].text;
              this.controller[2].text="";            

              
              sendSms2();
            }));
  }

  // função para enviar o sms
  sendSms2(){
    SmsSender sender = new SmsSender();
    //String address = someAddress();

    sender.sendSms(new SmsMessage(list["numero"], this.mensagem));

  }


}
