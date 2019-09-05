
// export function tableEvent(){
// 		var tTD; //用来存储当前更改宽度的Table Cell,避免快速移动鼠标的问题
// 		var table = document.getElementById("table-style-default");
// 		for (let j = 0; j < table.rows[0].cells.length; j++) {
// 			table.rows[0].cells[j].onmousedown = function () {
// 				//记录单元格
// 				tTD = this;
// 				if (event.offsetX > tTD.offsetWidth - 10) {
// 					tTD.mouseDown = true;
// 					tTD.oldX = event.x;
// 					tTD.oldWidth = tTD.offsetWidth;
// 				}
// //记录Table宽度
// //table = tTD; while (table.tagName != ‘TABLE') table = table.parentElement;
// //tTD.tableWidth = table.offsetWidth;
// 			};
// 			table.rows[0].cells[j].onmouseup = function () {
// //结束宽度调整
// 				if (tTD == undefined) tTD = this;
// 				tTD.mouseDown = false;
// 				tTD.style.cursor = 'default';
// 			};
// 			table.rows[0].cells[j].onmousemove = function () {
// //更改鼠标样式
// 				if (event.offsetX > this.offsetWidth - 10)
// 					this.style.cursor = 'col-resize';
// 				else
// 					this.style.cursor = 'default';
// //取出暂存的Table Cell
// 				if (tTD == undefined) tTD = this;
// //调整宽度
// 				if (tTD.mouseDown != null && tTD.mouseDown == true) {
// 					tTD.style.cursor = 'default';
// 					if (tTD.oldWidth + (event.x - tTD.oldX)>0)
// 						tTD.width = tTD.oldWidth + (event.x - tTD.oldX);
// //调整列宽
// 					tTD.style.width = tTD.width;
// 					tTD.style.cursor = 'col-resize';
// //调整该列中的每个Cell
// 					table = tTD; while (table.tagName != 'TABLE') table = table.parentElement;
// 					for (j = 0; j < table.rows.length; j++) {
// 						table.rows[j].cells[tTD.cellIndex].width = tTD.width;
// 					}
// //调整整个表
// //table.width = tTD.tableWidth + (tTD.offsetWidth – tTD.oldWidth);
// //table.style.width = table.width;
// 				}
// 			};
// 		}
// 	}
// export function	makeSortable(){
// 		var headers=table.getElementsByTagName("th");
// 		for(var i=0;i<headers.length;i++){
// 			(function(n){
// 				var flag=false;
// 				headers[n].onclick=function(){
// 					// sortrows(table,n);
// 					var tbody=table.tBodies[0];//第一个<tbody>
// 					var rows=tbody.getElementsByTagName("tr");//tbody中的所有行
// 					rows=Array.prototype.slice.call(rows,0);//真实数组中的快照
//
// 					//基于第n个<td>元素的值对行排序
// 					rows.sort(function(row1,row2){
// 						var cell1=row1.getElementsByTagName("td")[n];//获得第n个单元格
// 						var cell2=row2.getElementsByTagName("td")[n];
// 						var val1=cell1.textContent||cell1.innerText;//获得文本内容
// 						var val2=cell2.textContent||cell2.innerText;
//
// 						if(val1<val2){
// 							return -1;
// 						}else if(val1>val2){
// 							return 1;
// 						}else{
// 							return 0;
// 						}
// 					});
// 					if(flag){
// 						rows.reverse();
// 					}
// 					//在tbody中按它们的顺序把行添加到最后
// 					//这将自动把它们从当前位置移走，故没必要预先删除它们
// 					//如果<tbody>还包含了除了<tr>的任何其他元素，这些节点将会悬浮到顶部位置
// 					for(var i=0;i<rows.length;i++){
// 						tbody.appendChild(rows[i]);
// 					}
//
// 					flag=!flag;
// 				}
// 			}(i));
// 		}
// 	}



