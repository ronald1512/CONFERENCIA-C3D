/* Definición Léxica */
%lex

%options case-insensitive

%%

\s+											// se ignoran espacios en blanco
"//".*										// comentario de una linea


//palabras reservadas
"true"              return 'RTRUE';
"FALSE"             return 'RFALSE';
"("					return 'PARIZQ';
")"					return 'PARDER';

"+"					return 'MAS';
"-"					return 'MENOS';
"*"					return 'POR';
"/"					return 'DIV';

"!="				return 'DIFDE';
"=="				return 'IGIG';
">"					return 'MAY';
"<"					return 'MEN';

"&&"				return 'AND';
"||"				return 'OR';
"!"					return 'NEG';


[0-9]+"."[0-9]+ 				return 'DECIMAL';
[0-9]+              				return 'ENTERO';


<<EOF>>				return 'EOF';
.	{ 
    //KeepData.default.getInstance().addError(TipoError.LEXICO, "No se esperaba '"+yytext+"'", yylloc.first_line, yylloc.first_column);
    console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); 
    }			

/lex

%{
    //Expresiones
    const Arithmetic = require('../NodoAST/Arithmetic');
    const Relational = require('../NodoAST/Relational');
    const Logical = require('../NodoAST/Logical');
    const Constant = require('../NodoAST/Constant');


    //Enum
    const {TipoA} = require('../NodoAST/Arithmetic');
    const {TipoL} = require('../NodoAST/Logical');
    const {TipoR} = require('../NodoAST/Relational');
    const {Tipo} = require('../Objeto/Objeto');

    //Objeto
    const Primitivo = require('../Objeto/Primitivo');
    
%}

/* Asociación de operadores y precedencia */


/* Precedencia */
%left 'OR'   
%left 'AND'
%left 'IGIG' 'DIFDE'
%nonassoc 'MEN' 'MAY' 
%left 'MAS' 'MENOS'
%left 'POR' 'DIV'
%right UMINUS  'NEG'
%left 'PARIZQ' 'PARDER'


%start inicio

%% /* Definición de la gramática */

inicio : expr EOF   { return $1;}
    ;

expr:   arithmetic              {$$=$1;}
    |   logical                 {$$=$1;}
    |   relational              {$$=$1;}
    |   unary                   {$$=$1;}
    |   constant                {$$=$1;}
    |   PARIZQ expr PARDER      {$$=$2;}
    ;

unary:  MENOS expr %prec UMINUS  
    |   NEG expr
    ;


arithmetic: expr MAS expr       {$$=new Arithmetic.default(@1.first_line, @1.first_column,$1, TipoA.MAS, $3);}
        |   expr MENOS expr     {$$=new Arithmetic.default(@1.first_line, @1.first_column,$1, TipoA.MENOS, $3);}
        |   expr POR expr       {$$=new Arithmetic.default(@1.first_line, @1.first_column,$1, TipoA.POR, $3);}
        |   expr DIV expr       {$$=new Arithmetic.default(@1.first_line, @1.first_column,$1, TipoA.DIV, $3);}
        ;

logical:    expr AND expr       {$$=new Logical.default(@1.first_line, @1.first_column,$1, TipoL.AND, $3);}
        |   expr OR expr        {$$=new Logical.default(@1.first_line, @1.first_column,$1, TipoL.OR, $3);}
        ;

relational: expr IGIG expr      {$$=new Relational.default(@1.first_line, @1.first_column,$1, TipoR.IGIG, $3);}
        |   expr DIFDE expr     {$$=new Relational.default(@1.first_line, @1.first_column,$1, TipoR.DIFDE, $3);}
        |   expr MEN expr       {$$=new Relational.default(@1.first_line, @1.first_column,$1, TipoR.MEN, $3);}
        |   expr MAY expr       {$$=new Relational.default(@1.first_line, @1.first_column,$1, TipoR.MAY, $3);}
        ;


constant:   ENTERO      {$$=new Constant.default(@1.first_line, @1.first_column, new Primitivo.default(Tipo.INTEGER, Number.parseInt($1)));}
        |   DECIMAL     {$$=new Constant.default(@1.first_line, @1.first_column, new Primitivo.default(Tipo.DOUBLE, Number.parseFloat($1)));}
        |   RTRUE       {$$=new Constant.default(@1.first_line, @1.first_column, new Primitivo.default(Tipo.BOOLEAN, true));}
        |   RFALSE      {$$=new Constant.default(@1.first_line, @1.first_column, new Primitivo.default(Tipo.BOOLEAN, false));}
        ;


