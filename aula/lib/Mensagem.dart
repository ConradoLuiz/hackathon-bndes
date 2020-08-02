import 'dart:convert';
import 'dart:io';
import 'dart:async';
import 'package:aula/SmsBotao.dart';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'package:url_launcher/url_launcher.dart';

class Mensagem extends StatefulWidget {
  Mensagem({Key key}) : super(key: key);
  @override
  _MensagemState createState() => _MensagemState();
}

class _MensagemState extends State<Mensagem> {
  int _counter = 0;
  TextEditingController controllerNome= TextEditingController();
  TextEditingController controllerNumero= TextEditingController();
  List _toDoList = [];
  _MensagemState() {
    print(this._toDoList.length);
  }
 
  void AddNumero(){
    if(this.controllerNome.text!="" && this.controllerNumero.text!=""){
      setState(() {
        Map<String,dynamic> novoContato=Map();
        novoContato["nome"]=this.controllerNome.text;
        novoContato["numero"]=this.controllerNumero.text;
        this.controllerNome.text="";
        this.controllerNumero.text="";
        this._toDoList.add(novoContato);
        saveData();
    });
    }

  }
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    readData().then((data){
      setState(() {
        
     
      _toDoList=json.decode(data);
       });
    });
  }

  

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blue[700],
        title: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
          Text("Diploma de Bolso"),
          Container(
            width: 30,
            height: 30,
            margin: EdgeInsets.only(left: 6.0, right: 45.0),
            child: Image.asset('assets/graduation.png'),
          )
        ]),
      ),
      backgroundColor: Colors.blue,
      body:  Center(
              child: Column(children: <Widget>[
        Container(
          color: Colors.blue[600],
          margin: EdgeInsets.fromLTRB(6.0, 10.0, 6.0, 0.0),
          child:  TextField(
            controller: controllerNome,
            decoration: InputDecoration(
              labelText: 'Nome',
              border: OutlineInputBorder(),
              labelStyle: TextStyle(color: Colors.black)
            )
          ),
          
        ),
        Container(
          color: Colors.blue[600],
          margin: EdgeInsets.fromLTRB(6.0, 5.0, 6.0, 10.0),
          child:  TextField(
            controller: controllerNumero,
            decoration: InputDecoration(
              labelText: 'Numero',
              border: OutlineInputBorder(),
              labelStyle: TextStyle(color: Colors.black)
            )
          ),
          
        ),
        
        RaisedButton(color:Colors.blue[700],child: Text("ADD"), onPressed: AddNumero),
        Expanded(child:ListView.builder(
          
          itemCount:this._toDoList.length
          ,itemBuilder: (context,index){
            return SmsBotao(this._toDoList[index]).botao();
            
          })),
      ])),
      
    );
  }
  

 Future<File> getFile() async {
    final directory = await getApplicationDocumentsDirectory();
    String a ="${directory}/data1.json";
    print("a");
    return File("${directory.path}/data1.json");
  }

  Future<File> saveData() async {
    String data = json.encode(_toDoList);
    final file = await getFile();
    return file.writeAsString(data);
  }

  Future<String> readData() async {
    try {
      final file = await getFile();
      return file.readAsString();
    } catch (e) {
      return null;
    }
  }



}
