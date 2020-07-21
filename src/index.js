export default {
    install: function (Vue, opts = {}) {
        let {directiveName = 'skeleton', rows = 5, radius = 5, bg = '#eaebed'} = opts
        Vue.directive(directiveName, {
            update: function (el, binding, vnode) {
                let value = binding.value;
                if (typeof value !== 'object') {
                    value = {loading: value};
                }

                // loading为true并且el的data-skeleton="0"或者空的时候画骨架
                if (value.loading && (!el.dataset.skeleton || el.dataset.skeleton === '0')) {
                    el.dataset.skeleton = '1';

                    // el-table（自识别：宽度、列数、行高。可配置：行数、圆角、背景色）
                    if ('el-table' === vnode.componentOptions.tag) {
                        // 隐藏空数据提示
                        let totalWidth = el.clientWidth;
                        let emptyText = el.querySelector('.el-table__empty-block');
                        if (emptyText) {
                            emptyText.style.display = 'none';
                        }

                        // 计算每一列的宽度
                        let colsWidth = [];
                        let usedWidth = 0;
                        let freeCount = 0;
                        let cols = vnode.componentOptions.children;
                        for (let i = 0; i < cols.length; i++) {
                            colsWidth.push(cols[i].componentOptions.propsData.width * 1);
                            if (cols[i].componentOptions.propsData.width) {
                                usedWidth += cols[i].componentOptions.propsData.width * 1;
                            } else {
                                freeCount++;
                            }
                        }

                        // 没指定宽度的列宽 = (总宽 - 已指定的列宽总和) / 未指定列宽的个数
                        let autoWidth = (totalWidth - usedWidth) / freeCount;
                        for (let i = 0; i < colsWidth.length; i++) {
                            if (!colsWidth[i]) {
                                colsWidth[i] = autoWidth;
                            }
                        }

                        // 在tbody中画骨架
                        let tbody = el.querySelector('.el-table__body tbody');
                        // 行数（缺省为5）
                        rows = value.rows || rows;
                        // 骨架屏背景色（缺省为#eaebed）
                        bg = value.bg || bg;
                        // 圆角（缺省为5）
                        radius = value.radius || radius;
                        for (let i = 0; i < rows; i++) {
                            let tr = document.createElement('tr');
                            tr.className = 'skeleton-tr el-table__row';
                            for (let j = 0; j < colsWidth.length; j++) {
                                let td = document.createElement('td');
                                let cell = document.createElement('div');
                                cell.className = 'cell';
                                let div = document.createElement('div');
                                div.style = 'background: ' + bg + ';border-radius: ' + radius + 'px;text-indent:-999px;width:' + (Math.random() * 50 + 30) + '%;';
                                div.appendChild(document.createTextNode('.'));
                                cell.appendChild(div);
                                td.appendChild(cell);
                                tr.appendChild(td);
                            }
                            tbody.appendChild(tr);
                        }
                    }
                } else if (!value.loading && el.dataset.skeleton === '1') {
                    // loading为false并且el的data-skeleton="1"的时候删除骨架
                    el.dataset.skeleton = '0';

                    // el-table
                    if ('el-table' === vnode.componentOptions.tag) {
                        let allSkeletons = el.querySelectorAll('.skeleton-tr');
                        let tbody = el.querySelector('.el-table__body tbody');
                        for (let i = 0; i < allSkeletons.length; i++) {
                            tbody.removeChild(allSkeletons[i]);
                        }
                        let emptyText = el.querySelector('.el-table__empty-block');
                        if (emptyText) {
                            emptyText.style.display = 'block';
                        }
                    }
                }
            }
        });
    }
}